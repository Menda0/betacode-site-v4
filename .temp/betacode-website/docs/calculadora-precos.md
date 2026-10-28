# Calculadora de preços

Regras da calculadora em `/pt/pricing` (a versão inglesa usa os mesmos valores e a mesma lógica). A recomendação depende do tipo de negócio, do financiamento (startup) ou da existência de equipa técnica (negócio estabelecido), e do objetivo. A dimensão da empresa é pedida e aparece no resumo, mas não altera os serviços nem os preços.

Os prints estão em [`docs/calculadora-precos/`](calculadora-precos/).

## Fluxo

Depois de escolher o tipo de negócio, o indicador conta as perguntas desse ramo mais três passos finais: resultado, descrição do produto e contacto.

| Ramo | Perguntas | Total de passos |
| --- | --- | --- |
| Ainda sem resposta | — | 4 (contagem provisória) |
| Startup | tipo de negócio, financiamento, objetivo | 6 |
| Negócio estabelecido | tipo de negócio, dimensão, equipa técnica, objetivo | 7 |

A descrição do produto é opcional e não entra no cálculo. O contacto pede nome e e-mail; o sítio web é opcional.

Voltar numa pergunta apaga a resposta dessa pergunta. Mudar o tipo de negócio limpa o ramo anterior (financiamento, dimensão, equipa técnica e objetivo).

## Passos

### 1. Introdução

![Introdução da calculadora](calculadora-precos/01-intro.png)

### 2. Tipo de negócio

![Tipo de negócio](calculadora-precos/02-tipo-de-negocio.png)

| Opção | Segue para |
| --- | --- |
| Negócio novo (startup) | Tem financiamento? |
| Negócio estabelecido | Qual é a dimensão da sua empresa? |

### 3a. Startup — financiamento

![Financiamento](calculadora-precos/03-startup-financiamento.png)

Sim e Não seguem ambos para o objetivo. O que muda é a recomendação.

### 4a. Startup — objetivo

![Objetivo da startup](calculadora-precos/04-startup-objetivo.png)

| Financiamento | Objetivo | Serviços recomendados |
| --- | --- | --- |
| Não | Desenvolver um MVP | Betacode Ventures, Equipas técnicas autogeridas |
| Sim | Desenvolver um MVP | Equipas técnicas autogeridas |
| Não | Criar uma equipa técnica | Betacode Ventures, Equipas técnicas autogeridas |
| Sim | Criar uma equipa técnica | Betacode Ventures, Equipas técnicas autogeridas, Reforço de equipa |
| Sim ou Não | Suporte técnico | Suporte |
| Não | Não sei — ajudem-me a decidir | Betacode Ventures |
| Sim | Não sei — ajudem-me a decidir | Betacode Ventures, Equipas técnicas autogeridas, Formação, Reforço de equipa |

### 3b. Estabelecido — dimensão

![Dimensão da empresa](calculadora-precos/11-dimensao-empresa.png)

As quatro faixas (1–10, 11–50, 51–200, mais de 200) seguem todas para a pergunta da equipa técnica. Nenhuma altera a recomendação.

### 4b. Estabelecido — equipa técnica

![Equipa técnica](calculadora-precos/12-equipa-tecnica.png)

### 5b. Estabelecido — objetivo

![Objetivo do negócio estabelecido](calculadora-precos/13-estabelecido-objetivo.png)

| Equipa técnica | Objetivo | Serviços recomendados |
| --- | --- | --- |
| Sim ou Não | Suporte técnico | Suporte |
| Sim | Reforço de equipa (outsourcing) | Reforço de equipa, Formação |
| Não | Reforço de equipa (outsourcing) | Equipas técnicas autogeridas, Reforço de equipa |
| Sim | Modernizar aplicação antiga | Equipas técnicas autogeridas, Reforço de equipa, Formação |
| Não | Modernizar aplicação antiga | Equipas técnicas autogeridas |
| Sim | Desenvolver um produto novo | Equipas técnicas autogeridas, Reforço de equipa |
| Não | Desenvolver um produto novo | Equipas técnicas autogeridas |
| Não | Não sei — ajudem-me a decidir | Equipas técnicas autogeridas |
| Sim | Não sei — ajudem-me a decidir | Equipas técnicas autogeridas, Reforço de equipa, Formação |

Quando há vários serviços, aparecem por esta ordem: Betacode Ventures, Equipas técnicas autogeridas, Reforço de equipa, Formação, Suporte.

## Serviços e preços

Os prints de resultado abaixo são o caminho startup com financiamento e “Não sei — ajudem-me a decidir”, que mostra quatro serviços. O print de Suporte é o caminho de negócio estabelecido com suporte técnico. Os preços são os mesmos em qualquer caminho que chegue a esse serviço.

### Betacode Ventures

Modelo: parceria por equity. Não há taxa nem faixa de projeto. O texto mostrado é: “A Betacode Ventures é uma parceria por equity — o modelo de preços é adaptado à sua fase e produto.”

![Resultado Betacode Ventures](calculadora-precos/05-resultado-ventures.png)

### Equipas técnicas autogeridas

Modelo: projeto. No cartão, a estimativa de MVP junta as duas configurações: 20.000 € – 45.000 €.

![Resultado Equipas técnicas autogeridas](calculadora-precos/06-resultado-equipas.png)

Equipa pequena — programador júnior a tempo inteiro (20 – 30 €/h) e product owner a tempo parcial (50 – 60 €/h).

| Estimativa | Faixa |
| --- | --- |
| MVP (3 meses) | 20.000 € – 30.000 € |
| Primeiro ano | 85.000 € – 120.000 € |

![Preços da equipa pequena](calculadora-precos/06b-resultado-equipas-precos.png)

Equipa base — programador júnior a tempo inteiro (20 – 30 €/h), programador médio/sénior a tempo inteiro (30 – 50 €/h) e product owner a tempo parcial (50 – 60 €/h).

| Estimativa | Faixa |
| --- | --- |
| MVP (3 meses) | 30.000 € – 45.000 € |
| Primeiro ano | 120.000 € – 180.000 € |

Nota: “Faixas baseadas nas nossas configurações de equipa habituais. O preço final depende do âmbito e dos requisitos.”

![Preços da equipa base](calculadora-precos/06c-resultado-equipas-base.png)

### Reforço de equipa

Modelo: à hora. No cartão, a referência de projeto é 85.000 € – 180.000 €.

| Perfil | Regime | Taxa |
| --- | --- | --- |
| Programador júnior | Tempo inteiro | 20 – 30 €/h |
| Programador médio/sénior | Tempo inteiro | 30 – 50 €/h |
| Product Owner | Tempo parcial | 50 – 60 €/h |

Nota: “Taxas horárias acima. Faixas de projeto apresentadas como referência quando aplicável.”

![Resultado Reforço de equipa](calculadora-precos/07-resultado-reforco.png)

![Preços do reforço de equipa](calculadora-precos/07b-resultado-reforco-precos.png)

### Formação

Modelo: à hora. No cartão: 50 – 60 €/h.

| Perfil | Regime | Taxa |
| --- | --- | --- |
| Formador sénior | Tempo parcial | 50 – 60 €/h |

![Resultado Formação](calculadora-precos/08-resultado-formacao.png)

### Suporte

Modelo: à hora. Taxa única de 50 – 60 €/h, tempo parcial. Não há tabela de equipa nem faixa de projeto.

![Resultado Suporte](calculadora-precos/14-resultado-suporte.png)

## Descrição do produto

Passo opcional, depois do resultado. Pode continuar ou saltar. O texto não muda serviços nem preços; fica no pedido de contacto.

![Descrição do produto](calculadora-precos/09-descricao-produto.png)

## Contacto

| Campo | Obrigatório |
| --- | --- |
| Sítio web da empresa ou projeto | Não. Se for preenchido, tem de ser um endereço válido. |
| Nome | Sim |
| E-mail | Sim, e tem de ser um e-mail válido |

Enviar grava o contacto e notifica a equipa. O ecrã seguinte diz “Obrigado!”, “Recebemos os seus dados e entraremos em contacto consigo em breve.”, mostra até três artigos e os botões “Voltar à página inicial” e “Recomeçar”. Esse ecrã não tem print aqui, para não criar um contacto real.

![Formulário de contacto](calculadora-precos/10-contacto.png)
