import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

function numeroParaExtenso(numero: number, tipo: 'monetaria' | 'numerica'): string {
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

  let resultado = extenso.trim();

  if (tipo === 'monetaria') {
    const reais = Math.floor(numero);
    const centavos = Math.round((numero - reais) * 100);

    if (reais > 0) {
      resultado += reais === 1 ? ' real' : ' reais';
    }

    if (centavos > 0) {
      if (reais > 0) resultado += ' e ';
      resultado += numeroParaExtenso(centavos, 'numerica');
      resultado += centavos === 1 ? ' centavo' : ' centavos';
    }
  }

  return resultado;
}

export default function NumeroExtenso() {
  const [unidade, setUnidade] = useState<'monetaria' | 'numerica'>('monetaria');
  const [formato, setFormato] = useState<'lowercase' | 'uppercase' | 'capitalize'>('lowercase');
  const [valor, setValor] = useState('');
  const [resultado, setResultado] = useState('');

  const handleValorChange = (value: string) => {
    // Remove tudo exceto números e ponto/vírgula
    const numerico = value.replace(/[^\d.,]/g, '').replace(',', '.');
    setValor(numerico);

    if (!numerico) {
      setResultado('');
      return;
    }

    const numero = parseFloat(numerico);
    if (isNaN(numero)) {
      setResultado('');
      return;
    }

    let texto = numeroParaExtenso(numero, unidade);

    switch (formato) {
      case 'uppercase':
        texto = texto.toUpperCase();
        break;
      case 'capitalize':
        texto = texto.split(' ').map(word => 
          word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        ).join(' ');
        break;
      default:
        texto = texto.toLowerCase();
    }

    setResultado(texto);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Número por Extenso</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <Label>1. Qual a unidade?</Label>
            <RadioGroup
              value={unidade}
              onValueChange={(value: 'monetaria' | 'numerica') => {
                setUnidade(value);
                handleValorChange(valor);
              }}
              className="flex gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="monetaria" id="monetaria" />
                <Label htmlFor="monetaria">Monetária (R$)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="numerica" id="numerica" />
                <Label htmlFor="numerica">Numérica (número simples)</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-3">
            <Label>2. Qual o tipo de letra?</Label>
            <RadioGroup
              value={formato}
              onValueChange={(value: 'lowercase' | 'uppercase' | 'capitalize') => {
                setFormato(value);
                handleValorChange(valor);
              }}
              className="flex gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="lowercase" id="lowercase" />
                <Label htmlFor="lowercase">Minúsculas</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="uppercase" id="uppercase" />
                <Label htmlFor="uppercase">Maiúsculas</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="capitalize" id="capitalize" />
                <Label htmlFor="capitalize">Primeira Letra Maiúscula</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-3">
            <Label>3. Valor</Label>
            <Input
              value={valor}
              onChange={(e) => handleValorChange(e.target.value)}
              placeholder={unidade === 'monetaria' ? 'R$ 0,00' : '0'}
            />
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