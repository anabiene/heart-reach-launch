import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Upload, X, FileText } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const ParticipationReport = () => {
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [reportTitle, setReportTitle] = useState("");
  const [signatures, setSignatures] = useState({
    president: "",
    treasurer: "",
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setUploadedImages((prev) => [...prev, reader.result as string]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (index: number) => {
    setUploadedImages((prev) => prev.filter((_, i) => i !== index));
  };

  const generateReport = () => {
    if (uploadedImages.length === 0) {
      toast.error("Adicione pelo menos uma imagem ao relatório");
      return;
    }
    if (!reportTitle) {
      toast.error("Adicione um título ao relatório");
      return;
    }
    toast.success("Relatório gerado com sucesso!");
    // Here you would implement PDF generation logic
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 container mx-auto px-4 py-8 mt-20">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-foreground mb-8">Relatório de Participação</h1>

          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Informações do Relatório</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="reportTitle">Título do Relatório</Label>
                  <Input
                    id="reportTitle"
                    value={reportTitle}
                    onChange={(e) => setReportTitle(e.target.value)}
                    placeholder="Ex: Relatório de Atividades - Janeiro 2024"
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="president">Nome do Presidente</Label>
                    <Input
                      id="president"
                      value={signatures.president}
                      onChange={(e) => setSignatures({ ...signatures, president: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="treasurer">Nome do Tesoureiro</Label>
                    <Input
                      id="treasurer"
                      value={signatures.treasurer}
                      onChange={(e) => setSignatures({ ...signatures, treasurer: e.target.value })}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Upload de Documentos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                    <input
                      type="file"
                      id="fileUpload"
                      className="hidden"
                      accept="image/*"
                      multiple
                      onChange={handleImageUpload}
                    />
                    <Label
                      htmlFor="fileUpload"
                      className="cursor-pointer flex flex-col items-center gap-2"
                    >
                      <Upload className="w-12 h-12 text-muted-foreground" />
                      <span className="text-muted-foreground">
                        Clique para fazer upload de imagens do relatório físico
                      </span>
                    </Label>
                  </div>

                  {uploadedImages.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {uploadedImages.map((image, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={image}
                            alt={`Upload ${index + 1}`}
                            className="w-full h-48 object-cover rounded-lg"
                          />
                          <Button
                            size="icon"
                            variant="destructive"
                            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => removeImage(index)}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end gap-4">
              <Button variant="outline">
                <FileText className="w-4 h-4 mr-2" />
                Visualizar Prévia
              </Button>
              <Button onClick={generateReport}>
                Gerar Relatório PDF
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ParticipationReport;
