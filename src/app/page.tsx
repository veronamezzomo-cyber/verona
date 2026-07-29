import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-4">
      <main className="max-w-2xl w-full space-y-8 text-center">
        <div className="flex flex-col items-center gap-4">
          <div className="p-3 bg-primary/10 rounded-2xl">
            <Sparkles className="h-10 w-10 text-primary" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            Novo Projeto
          </h1>
          <p className="text-xl text-muted-foreground">
            Sua estrutura básica está pronta. Comece a construir seu novo site aqui.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Genkit</CardTitle>
              <CardDescription>IA Generativa configurada</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Pronto para criar fluxos de IA em src/ai/flows.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>ShadCN UI</CardTitle>
              <CardDescription>Componentes instalados</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Componentes base disponíveis na pasta components/ui.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-center gap-4 pt-8">
          <Button size="lg">Documentação</Button>
          <Button variant="outline" size="lg">Configurações</Button>
        </div>
      </main>
    </div>
  );
}
