import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Pencil, Trash2, Plus, X } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { calculateAge } from "@/lib/utils";

interface Volunteer {
  id: string;
  name: string;
  email: string;
  date_of_birth: string;
  membership_date: string;
  role: string;
}

const Volunteers = () => {
  const [volunteers, setVolunteers] = useState<Volunteer[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingVolunteer, setEditingVolunteer] = useState<Volunteer | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    date_of_birth: "",
    membership_date: "",
    role: "",
  });

  useEffect(() => {
    fetchVolunteers();
  }, []);

  const fetchVolunteers = async () => {
    const { data, error } = await supabase
      .from("volunteers")
      .select("*")
      .order("name", { ascending: true });

    if (error) {
      toast.error("Erro ao carregar voluntários");
    } else {
      setVolunteers(data || []);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (editingVolunteer) {
      const { error } = await supabase
        .from("volunteers")
        .update(formData)
        .eq("id", editingVolunteer.id);

      if (error) {
        toast.error("Erro ao atualizar voluntário");
      } else {
        toast.success("Voluntário atualizado com sucesso!");
        resetForm();
        fetchVolunteers();
      }
    } else {
      const { error } = await supabase.from("volunteers").insert([formData]);

      if (error) {
        toast.error("Erro ao criar voluntário");
      } else {
        toast.success("Voluntário criado com sucesso!");
        resetForm();
        fetchVolunteers();
      }
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir este voluntário?")) return;

    const { error } = await supabase.from("volunteers").delete().eq("id", id);

    if (error) {
      toast.error("Erro ao excluir voluntário");
    } else {
      toast.success("Voluntário excluído com sucesso!");
      fetchVolunteers();
    }
  };

  const handleEdit = (volunteer: Volunteer) => {
    setEditingVolunteer(volunteer);
    setFormData({
      name: volunteer.name,
      email: volunteer.email,
      date_of_birth: volunteer.date_of_birth,
      membership_date: volunteer.membership_date,
      role: volunteer.role,
    });
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      date_of_birth: "",
      membership_date: "",
      role: "",
    });
    setEditingVolunteer(null);
    setShowForm(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 container mx-auto px-4 py-8 mt-20">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold text-foreground">Voluntários</h1>
            <Button onClick={() => setShowForm(!showForm)} className="gap-2">
              {showForm ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
              {showForm ? "Cancelar" : "Adicionar Voluntário"}
            </Button>
          </div>

          {showForm && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>{editingVolunteer ? "Editar Voluntário" : "Novo Voluntário"}</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nome Completo</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="date_of_birth">Data de Nascimento</Label>
                      <Input
                        id="date_of_birth"
                        type="date"
                        value={formData.date_of_birth}
                        onChange={(e) => setFormData({ ...formData, date_of_birth: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="membership_date">Data de Associação</Label>
                      <Input
                        id="membership_date"
                        type="date"
                        value={formData.membership_date}
                        onChange={(e) => setFormData({ ...formData, membership_date: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="role">Função na Associação</Label>
                      <Input
                        id="role"
                        value={formData.role}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button type="submit">
                      {editingVolunteer ? "Atualizar" : "Criar"} Voluntário
                    </Button>
                    {editingVolunteer && (
                      <Button type="button" variant="outline" onClick={resetForm}>
                        Cancelar
                      </Button>
                    )}
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          <div className="grid gap-4">
            {volunteers.map((volunteer) => (
              <Card key={volunteer.id}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2">{volunteer.name}</h3>
                      <div className="space-y-1 text-muted-foreground">
                        <p>📧 {volunteer.email}</p>
                        <p>🎂 {format(new Date(volunteer.date_of_birth), "dd/MM/yyyy", { locale: ptBR })} ({calculateAge(volunteer.date_of_birth)} anos)</p>
                        <p>📅 Voluntário desde {format(new Date(volunteer.membership_date), "dd/MM/yyyy", { locale: ptBR })}</p>
                        <p>💼 {volunteer.role}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleEdit(volunteer)}
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => handleDelete(volunteer.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Volunteers;
