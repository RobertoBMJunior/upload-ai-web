import { Button } from "./components/ui/button";
import { Github, Wand2} from 'lucide-react'
import { Separator } from "./components/ui/separator";
import { Textarea } from "./components/ui/textarea";
import { Label } from "./components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./components/ui/select";
import { Slider } from "./components/ui/slider";
import { VideoInputForm } from "./components/video-input-form";
import { PromptSelect } from "./components/prompt-select";
import { FormEvent, useState } from "react";
import {api} from './lib/axios'

export function App() {
  const [temperature, setTemperature] = useState(0.5)
  const [videoId, setVideoId] = useState<string | null>(null)
  const [prompt, setPrompt] = useState<string> ('')
  const [responseIA, setResponseIA] = useState<string>('')
  const [status,setStatus] = useState<string>('Executar')


  function handlePromptSelected(template: string) {
    setPrompt(template)
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus('Executando...')

    const response = await api.post('/ai/complete', {
      videoId,
      temperature,
      prompt,
    })

    console.log(prompt.length)
    
    setStatus('Executar')
    setResponseIA(response.data.choices[0].message.content)
  }

  function handleChange (event: any  ) {
    setPrompt(event.target.value)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="px-6 py-6 flex items-center justify-between border-b ">
        <h1 className="text-xl font-bold">upload-ai</h1>
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground">Desenvolvido por Roberto Júnior</span>

          <Separator orientation="vertical" className="h-6"/>

          <a href="https://github.com/RobertoBMJunior/upload-ai-web" target="_blank">
            <Button variant={"secondary"}>
              <Github className="w-4 h-4 mr-2"/>
              Github
              
            </Button>
          </a>
        </div>
      </div>

      <main className="flex-1 p-6 flex gap-6">
        <div className="flex flex-col flex-1 gap-4">
          <div className="grid grid-rows-2 gap-4 flex-1">
            <Textarea 
              placeholder="Obtenha sugestões de títulos e descrições para o seu vídeo do YouTube. Carregue o seu vídeo e selecione a opção desejada no prompt." 
              className="resize-none p-4 leading-relaxed"
              value={prompt}
              onChange={handleChange}
            />

            <Textarea 
              placeholder="Resultado gerado pela IA" 
              readOnly 
              className="resize-none p-4 leading-relaxed "
              value={responseIA}
            />
          </div>


          <p className="text-sm text-muted-foreground">
            PS: O idioma do vídeo carregado deve ser em português e no formato mp4. 

             Esta ferramenta usa apenas o audio do vídeo caregado, ou seja, o vídeo mp4 vai ser convertido em um arquivo de audio mp3.

             No prompt, a variável <code className="text-violet-400"> {'{trancription}'}</code> é substituída pela transcrição do audio mp3.
        
             É pela análise desta transcrição que a inteligência artificial vai te sugerir opções de descrição e de títulos para o seu vídeo.
            <br />
            O select do prompt, no menu lateral direito, oferece duas sugestões do que você pode fazer com esta IA. Também é possível editar o prompt de comando e pedir pra inteligência artificial fazer outras coisas com a transcrição do vídeo.
            <br />
            Se quiser carregar outro vídeo, recarregue a página!
            <br />
            

          </p>

        </div>
        <aside className="w-80 space-y-6">
          <VideoInputForm onVideoUploaded={setVideoId}/>

          <Separator/>

          <form onSubmit={handleSubmit} className="space-y-6">
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
                className="cursor-pointer"
              />
        

              <p className="text-xs text-muted-foreground italic leading-relaxed">
                Valores mais altos tendem a deixar o resultado mais criativos e com possíveis erros.
              </p>
            </div>

            <Separator/>

            <Button disabled={(status !== 'Executar') || (prompt.length < 10) || (videoId === null)} className="w-full" type="submit">
              {status === 'Executar' ?
                <>
                  Executar
                <Wand2 className="h-4 w-4 ml-2"/>
                </> :
                <>Executando...</>
              }
          
            </Button>

          </form>

        </aside>
      </main>
    </div>
  )
}
