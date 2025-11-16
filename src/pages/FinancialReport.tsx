import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Plus, X, FileDown } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

interface FinancialEntry {
  id: string;
  description: string;
  amount: number;
  date: string;
}

const FinancialReport = () => {
  const [income, setIncome] = useState<FinancialEntry[]>([]);
  const [expenses, setExpenses] = useState<FinancialEntry[]>([]);
  const [showIncomeForm, setShowIncomeForm] = useState(false);
  const [showExpenseForm, setShowExpenseForm] = useState(false);
  const [incomeForm, setIncomeForm] = useState({ description: "", amount: "", date: "" });
  const [expenseForm, setExpenseForm] = useState({ description: "", amount: "", date: "" });

  const addIncome = () => {
    if (!incomeForm.description || !incomeForm.amount || !incomeForm.date) {
      toast.error("Preencha todos os campos");
      return;
    }
    const newIncome: FinancialEntry = {
      id: Date.now().toString(),
      description: incomeForm.description,
      amount: parseFloat(incomeForm.amount),
      date: incomeForm.date,
    };
    setIncome([...income, newIncome]);
    setIncomeForm({ description: "", amount: "", date: "" });
    setShowIncomeForm(false);
    toast.success("Receita adicionada");
  };

  const addExpense = () => {
    if (!expenseForm.description || !expenseForm.amount || !expenseForm.date) {
      toast.error("Preencha todos os campos");
      return;
    }
    const newExpense: FinancialEntry = {
      id: Date.now().toString(),
      description: expenseForm.description,
      amount: parseFloat(expenseForm.amount),
      date: expenseForm.date,
    };
    setExpenses([...expenses, newExpense]);
    setExpenseForm({ description: "", amount: "", date: "" });
    setShowExpenseForm(false);
    toast.success("Despesa adicionada");
  };

  const removeIncome = (id: string) => {
    setIncome(income.filter((item) => item.id !== id));
  };

  const removeExpense = (id: string) => {
    setExpenses(expenses.filter((item) => item.id !== id));
  };

  const totalIncome = income.reduce((sum, item) => sum + item.amount, 0);
  const totalExpenses = expenses.reduce((sum, item) => sum + item.amount, 0);
  const balance = totalIncome - totalExpenses;

  const generatePDF = () => {
    toast.success("Gerando relatório PDF...");
    // Implement PDF generation logic
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 container mx-auto px-4 py-8 mt-20">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold text-foreground">Relatório Financeiro</h1>
            <Button onClick={generatePDF} className="gap-2">
              <FileDown className="w-4 h-4" />
              Gerar PDF
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-green-600">Receitas</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">
                  R$ {totalIncome.toFixed(2).replace(".", ",")}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-red-600">Despesas</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">
                  R$ {totalExpenses.toFixed(2).replace(".", ",")}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className={balance >= 0 ? "text-blue-600" : "text-red-600"}>
                  Saldo
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">
                  R$ {balance.toFixed(2).replace(".", ",")}
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Income Section */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Receitas</CardTitle>
                  <Button size="sm" onClick={() => setShowIncomeForm(!showIncomeForm)}>
                    {showIncomeForm ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {showIncomeForm && (
                  <div className="space-y-2 p-4 border rounded-lg">
                    <div className="space-y-2">
                      <Label>Descrição</Label>
                      <Input
                        value={incomeForm.description}
                        onChange={(e) =>
                          setIncomeForm({ ...incomeForm, description: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Valor (R$)</Label>
                      <Input
                        type="number"
                        step="0.01"
                        value={incomeForm.amount}
                        onChange={(e) =>
                          setIncomeForm({ ...incomeForm, amount: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Data</Label>
                      <Input
                        type="date"
                        value={incomeForm.date}
                        onChange={(e) => setIncomeForm({ ...incomeForm, date: e.target.value })}
                      />
                    </div>
                    <Button onClick={addIncome} className="w-full">
                      Adicionar Receita
                    </Button>
                  </div>
                )}
                {income.map((item) => (
                  <div key={item.id} className="flex justify-between items-center p-3 border rounded">
                    <div>
                      <p className="font-medium">{item.description}</p>
                      <p className="text-sm text-muted-foreground">{item.date}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-green-600">
                        R$ {item.amount.toFixed(2).replace(".", ",")}
                      </span>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => removeIncome(item.id)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Expenses Section */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Despesas</CardTitle>
                  <Button size="sm" onClick={() => setShowExpenseForm(!showExpenseForm)}>
                    {showExpenseForm ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {showExpenseForm && (
                  <div className="space-y-2 p-4 border rounded-lg">
                    <div className="space-y-2">
                      <Label>Descrição</Label>
                      <Input
                        value={expenseForm.description}
                        onChange={(e) =>
                          setExpenseForm({ ...expenseForm, description: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Valor (R$)</Label>
                      <Input
                        type="number"
                        step="0.01"
                        value={expenseForm.amount}
                        onChange={(e) =>
                          setExpenseForm({ ...expenseForm, amount: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Data</Label>
                      <Input
                        type="date"
                        value={expenseForm.date}
                        onChange={(e) =>
                          setExpenseForm({ ...expenseForm, date: e.target.value })
                        }
                      />
                    </div>
                    <Button onClick={addExpense} className="w-full">
                      Adicionar Despesa
                    </Button>
                  </div>
                )}
                {expenses.map((item) => (
                  <div key={item.id} className="flex justify-between items-center p-3 border rounded">
                    <div>
                      <p className="font-medium">{item.description}</p>
                      <p className="text-sm text-muted-foreground">{item.date}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-red-600">
                        R$ {item.amount.toFixed(2).replace(".", ",")}
                      </span>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => removeExpense(item.id)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FinancialReport;
