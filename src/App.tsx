import { Button } from "./components/ui/button";
import { Github, Wand2} from 'lucide-react'
import { Separator } from "./components/ui/separator";
import { Textarea } from "./components/ui/textarea";
import { Label } from "./components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./components/ui/select";
import { Slider } from "./components/ui/slider";
import { VideoInputForm } from "./components/video-input-form";
import { PromptSelect } from "./components/prompt-select";
import { useState } from "react";

export function App() {
  const [temperature, setTemperature] = useState(0.5)
  const [videoId, setVideoId] = useState<string | null>(null)

  function handlePromptSelected(template: string) {
    console.log(template)
  }


  return (
    <div className="min-h-screen flex flex-col">
      <div className="px-6 py-6 flex items-center justify-between border-b ">
        <h1 className="text-xl font-bold">upload-ai</h1>
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground">Desenvolvido por Roberto Júnior</span>

          <Separator orientation="vertical" className="h-6"/>

          <Button variant={"secondary"}>
            <Github className="w-4 h-4 mr-2"/>
            Github
          </Button>
        </div>
      </div>

      <main className="flex-1 p-6 flex gap-6">
        <div className="flex flex-col flex-1 gap-4">
          <div className="grid grid-rows-2 gap-4 flex-1">
            <Textarea 
              placeholder="Inclua o prompt para a IA..." 
              className="resize-none p-4 leading-relaxed"
            />

            <Textarea 
              placeholder="Resultado gerado pela IA" 
              readOnly 
              className="resize-none p-4 leading-relaxed "
            />
          </div>


          <p className="text-sm text-muted-foreground">
            Lembre-se: Você pode utilizar a variável <code className="text-violet-400"> {'{trancription}'}</code>  no seu prompt para adicionar o conteúdo da transcrição do vídeo selecionado. 
          </p>

        </div>
        <aside className="w-80 space-y-6">
          <VideoInputForm onVideoUploaded={setVideoId}/>

          <Separator/>

          <form className="space-y-6">
            <div className="space-y-2">
              <Label>Prompt</Label>
              <PromptSelect onPromptSelected={handlePromptSelected}/>
              
            </div>


            <div className="space-y-2">
              <Label>Modelo</Label>

              <Select disabled defaultValue="gpt3.5">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gpt3.5">GPT 3.5-turbo 16k</SelectItem>
                </SelectContent>
              </Select>

              <p className="text-xs text-muted-foreground italic">
                Você poderá customizar essa opção em breve!
              </p>
            </div>

            <Separator/>

            <div className="space-y-4">
              <Label>Temperatura</Label>

              <Slider 
                min={0} 
                max={1} 
                step={.1} 
                value={[temperature]}
                onValueChange={value => setTemperature(value[0])}
              />
        

              <p className="text-xs text-muted-foreground italic leading-relaxed">
                Valores mais altos tendem a deixar o resultado mais criativos e com possíveis erros.
              </p>
            </div>

            <Separator/>

            <Button className="w-full" type="submit">
              Executar
              <Wand2 className="h-4 w-4 ml-2"/>
            </Button>

          </form>

        </aside>
      </main>
    </div>
  )
}
