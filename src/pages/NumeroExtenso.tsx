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
  const milhares = ['', 'mil', 'milhão', 'bilhão', 'trilhão'];
  const milharesPlural = ['', 'mil', 'milhões', 'bilhões', 'trilhões'];

  if (numero === 0) return 'zero';
  if (numero === 100) return 'cem';

  function converterGrupo(n: number): string {
    let resultado = '';
    
    // Centenas
    const centena = Math.floor(n / 100);
    if (centena > 0) {
      resultado += centenas[centena];
      n %= 100;
      if (n > 0) resultado += ' e ';
    }
    
    // Dezenas e unidades
    if (n >= 10 && n < 20) {
      resultado += dezADezenove[n - 10];
    } else {
      const dezena = Math.floor(n / 10);
      if (dezena > 0) {
        resultado += dezenas[dezena];
        n %= 10;
        if (n > 0) resultado += ' e ';
      }
      if (n > 0) {
        resultado += unidades[n];
      }
    }
    
    return resultado;
  }

  function converterNumeroCompleto(n: number): string {
    if (n === 0) return 'zero';
    
    let resultado = '';
    let i = 0;
    
    while (n > 0) {
      const grupo = n % 1000;
      if (grupo > 0) {
        const conversaoGrupo = converterGrupo(grupo);
        if (i > 0) {
          if (grupo === 1) {
            resultado = milhares[i] + ' ' + resultado;
          } else {
            resultado = conversaoGrupo + ' ' + milharesPlural[i] + ' ' + resultado;
          }
        } else {
          resultado = conversaoGrupo;
        }
      }
      n = Math.floor(n / 1000);
      i++;
    }
    
    return resultado.trim();
  }

  if (tipo === 'monetaria') {
    const partes = numero.toString().split('.');
    const reais = parseInt(partes[0]);
    const centavos = partes.length > 1 ? parseInt(partes[1].padEnd(2, '0')) : 0;

    let resultado = '';

    if (reais > 0) {
      resultado += converterNumeroCompleto(reais);
      resultado += reais === 1 ? ' real' : ' reais';
    }

    if (centavos > 0) {
      if (reais > 0) resultado += ' e ';
      resultado += converterNumeroCompleto(centavos);
      resultado += centavos === 1 ? ' centavo' : ' centavos';
    }

    if (reais === 0 && centavos === 0) {
      resultado = 'zero reais';
    }

    return resultado;
  } else {
    return converterNumeroCompleto(Math.floor(numero));
  }
}

export default function NumeroExtenso() {
  const [unidade, setUnidade] = useState<'monetaria' | 'numerica'>('monetaria');
  const [formato, setFormato] = useState<'lowercase' | 'uppercase' | 'capitalize'>('lowercase');
  const [valor, setValor] = useState('');
  const [resultado, setResultado] = useState('');

  const formatarValor = (value: string) => {
    // Remove tudo exceto números e vírgula
    let numerico = value.replace(/[^\d,]/g, '');
    
    // Converte vírgula para ponto
    numerico = numerico.replace(',', '.');
    
    // Limita a dois decimais
    const partes = numerico.split('.');
    if (partes.length > 1) {
      numerico = partes[0] + '.' + partes[1].slice(0, 2);
    }
    
    const numero = parseFloat(numerico) || 0;
    
    // Formata o número de acordo com a unidade
    if (unidade === 'monetaria') {
      return numero.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
    } else {
      return numero.toLocaleString('pt-BR');
    }
  };

  const handleValorChange = (inputValue: string) => {
    // Remove formatação atual
    let limpo = inputValue.replace(/[^\d,]/g, '');
    
    // Se estiver vazio, define como zero
    if (!limpo) {
      limpo = '0';
    }
    
    // Formata o valor
    const formatado = formatarValor(limpo);
    setValor(formatado);
    
    // Converte para número para processar
    const numero = parseFloat(limpo.replace(',', '.')) || 0;
    
    // Gera o texto por extenso
    let texto = numeroParaExtenso(numero, unidade);
    
    // Aplica o formato de texto selecionado
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

  const handleUnidadeChange = (novaUnidade: 'monetaria' | 'numerica') => {
    setUnidade(novaUnidade);
    // Reprocessa o valor atual com a nova unidade
    if (valor) {
      const numero = parseFloat(valor.replace(/[^\d,]/g, '').replace(',', '.')) || 0;
      let texto = numeroParaExtenso(numero, novaUnidade);
      
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
      setValor(formatarValor(numero.toString()));
    }
  };

  const handleFormatoChange = (novoFormato: 'lowercase' | 'uppercase' | 'capitalize') => {
    setFormato(novoFormato);
    if (resultado) {
      let novoTexto = resultado.toLowerCase();
      switch (novoFormato) {
        case 'uppercase':
          novoTexto = novoTexto.toUpperCase();
          break;
        case 'capitalize':
          novoTexto = novoTexto.split(' ').map(word => 
            word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
          ).join(' ');
          break;
      }
      setResultado(novoTexto);
    }
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
              onValueChange={(value: 'monetaria' | 'numerica') => handleUnidadeChange(value)}
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
              onValueChange={(value: 'lowercase' | 'uppercase' | 'capitalize') => handleFormatoChange(value)}
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
              onFocus={(e) => {
                if (e.target.value === 'R$ 0,00' || e.target.value === '0') {
                  setValor('');
                }
              }}
              onBlur={() => {
                if (!valor) {
                  handleValorChange('0');
                }
              }}
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