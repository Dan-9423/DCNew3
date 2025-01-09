import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function numeroParaExtenso(numero: number): string {
  const unidades = ['', 'um', 'dois', 'três', 'quatro', 'cinco', 'seis', 'sete', 'oito', 'nove'];
  const dezADezenove = ['dez', 'onze', 'doze', 'treze', 'quatorze', 'quinze', 'dezesseis', 'dezessete', 'dezoito', 'dezenove'];
  const dezenas = ['', '', 'vinte', 'trinta', 'quarenta', 'cinquenta', 'sessenta', 'setenta', 'oitenta', 'noventa'];
  const centenas = ['', 'cento', 'duzentos', 'trezentos', 'quatrocentos', 'quinhentos', 'seiscentos', 'setecentos', 'oitocentos', 'novecentos'];

  if (numero === 0) return 'zero';
  if (numero === 100) return 'cem';

  let extenso = '';
  
  // Centenas
  if (numero >= 100) {
    extenso += centenas[Math.floor(numero / 100)] + ' e ';
    numero %= 100;
  }
  
  // Dezenas e unidades
  if (numero >= 10 && numero < 20) {
    extenso += dezADezenove[numero - 10];
  } else {
    if (numero >= 20) {
      extenso += dezenas[Math.floor(numero / 10)];
      numero %= 10;
      if (numero > 0) extenso += ' e ';
    }
    if (numero > 0) extenso += unidades[numero];
  }

  return extenso.trim();
}

export default function NumeroExtenso() {
  const [reais, setReais] = useState('');
  const [centavos, setCentavos] = useState('');
  const [formato, setFormato] = useState<'lowercase' | 'uppercase'>('lowercase');
  const [resultado, setResultado] = useState('');

  const handleReaisChange = (value: string) => {
    const numerico = value.replace(/\D/g, '');
    setReais(numerico);
    atualizarResultado(numerico, centavos);
  };

  const handleCentavosChange = (value: string) => {
    const numerico = value.replace(/\D/g, '').slice(0, 2);
    setCentavos(numerico);
    atualizarResultado(reais, numerico);
  };

  const atualizarResultado = (reaisValue: string, centavosValue: string) => {
    if (!reaisValue && !centavosValue) {
      setResultado('');
      return;
    }

    const reaisNum = parseInt(reaisValue || '0');
    const centavosNum = parseInt(centavosValue || '0');

    let texto = '';

    if (reaisNum > 0) {
      texto += numeroParaExtenso(reaisNum);
      texto += reaisNum === 1 ? ' real' : ' reais';
    }

    if (centavosNum > 0) {
      if (reaisNum > 0) texto += ' e ';
      texto += numeroParaExtenso(centavosNum);
      texto += centavosNum === 1 ? ' centavo' : ' centavos';
    }

    setResultado(formato === 'uppercase' ? texto.toUpperCase() : texto.toLowerCase());
  };

  const handleFormatoChange = (value: 'lowercase' | 'uppercase') => {
    setFormato(value);
    setResultado(prev => value === 'uppercase' ? prev.toUpperCase() : prev.toLowerCase());
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Número por Extenso</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="reais">Reais</Label>
              <Input
                id="reais"
                placeholder="0"
                value={reais}
                onChange={(e) => handleReaisChange(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="centavos">Centavos</Label>
              <Input
                id="centavos"
                placeholder="00"
                value={centavos}
                onChange={(e) => handleCentavosChange(e.target.value)}
                maxLength={2}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Formato</Label>
            <Select value={formato} onValueChange={handleFormatoChange}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o formato" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="lowercase">Minúsculas</SelectItem>
                <SelectItem value="uppercase">Maiúsculas</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Resultado</Label>
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg min-h-[100px]">
              {resultado || <span className="text-gray-400">Digite um valor para ver o resultado</span>}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}