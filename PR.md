# ENGWEB2024-Normal

## descrição da persistência de dados e setup da base de dados (mongo)  

Para a persistência de dados, fez se a conversão do ficheiro "contratos2024.csv" para um .json através do script pithon csv_2_JSON.py aqui no repositório

De seguida, já como ficheiro em json Array e com o campo _id, inicializou-se o mongoEW no docker e fez se os seguintes comandos:

sudo docker cp contratos.json mongoEW:/tmp

sudo docker exec -it mongoEW bash

    mongoimport -d contratos -c contratos /tmp/db.json --jsonArray

desta maneira importou-se o ficheiro contratos.json na base de dados "contratos" na coleção "contratos"

## Respostas textuais pedidas 

No caso as respostas textuais pedidas foram queries em MongoDB;

    db.contratos.countDocuments() 

A primeira conta o número total de documentos na coleção "contratos" e retorna o resultado com o uso da função countDocuments().


    db.contratos.find({ "tipoprocedimento": "Ajuste Direto Regime Geral" }).count()" 
A segunda filtra os documentos na coleção "contratos" onde o campo "tipoprocedimento" é igual a "Ajuste Direto Regime Geral" e conta o número de documentos correspondentes com o uso da função count().

    db.contratos.distinct("entidade_comunicante").sort()
A terceira retorna uma lista de entidades comunicantes distintas na coleção "contratos" e ordena a lista com o uso da função sort().

    db.contratos.aggregate([{"$group": {"_id": "$tipoprocedimento", "count": {"$sum": 1}}}])
A quarta agrupa os documentos na coleção "contratos" pelo campo "tipoprocedimento" e conta o número de documentos em cada grupo com o uso da função aggregate().

    db.contratos.aggregate([{ $group: {_id: "$entidade_comunicante",totalMontante: {$sum: {$toDouble: {$replaceOne: {input: {$replaceOne: {input: "$precoContratual",find: ",",replacement: "."}},find: ".",replacement: ""}}}}}}])

A quinta utiliza a operação de agregação para agrupar os documentos da coleção "contratos" pelo campo "entidade_comunicante" e, em seguida, calcula o somatório dos valores numéricos do campo "precoContratual" para cada entidade. O uso de $replaceOne é necessário para substituir vírgulas por pontos e converter o valor para um tipo numérico.


## Api desenvolvida

Para esta API (responde em JSON) foi criado um modelo, um controlador e um route de contrato, sendo que no modelo temos lá a estutura do contrato em mongoDB com os tipos dos campos na BD (no caso tudo string), no controlador temos todas as queries definidas em mongoose para satisfazer aos campos pedidos no enunciado e por fim o route que responde aos metodos POST, GET, PUT e DELETE, de notar que o metodo get geral ou seja o dos contratos que extrai os parâmetros da consulta da URL, neste caso, entidade, tipo e nipc, sendo este nipc adicionado para responder à interface.
Em seguida, cria um objeto de consulta vazio inicializado como {}.
Se algum parâmetro específico for fornecido na URL, como entidade, tipo ou nipc, é adicionada uma condição de consulta correspondente ao objeto de consulta.
Por exemplo, se a URL for /contratos?entidade=EEEE, é adicionado uma condição de consulta para ir buscar contratos onde o campo entidade_comunicante seja igual a "EEEE".
Após a construção da consulta, ela chama o método findByQuery do controlador que simplesmente executa um find com a query como argumento do find para o mongoDB.
De resto é tudo semelhante ao desenvolvido nas aulas

## Interface desenvolvida

Esta interface faz pedidos, através do axios para a porta em que a API responde, e de seguida, para a página principal é feito um pedido de todos os contratos à API e de seguida é renderizada uma página (pug) em que é feita uma tabela com os campos pedidos, para os campos que quando clicados são redirecionados para outras páginas (idContrato e número de entidade), no caso do idContrato é renderizada a página item que os parámetro do render são "(item', { title: 'Contrato ' + req.params.id ,item:resposta.data})" para se poder depois na página pug gerar uma linha para cada campo existente no item (each val in intem ...), já no caso do 
número de entidade é redirecionado para a página do NIPC que é gerada através de  um pedido axios axios.get("http://localhost:16000/contratos?nipc=" + req.params.id), daí se ter adicionado esta funcionalidade na API
e assim é criada a página individual para cada NIPC com as informações e a tabela gerada de maneira semelhante à da pagina principal e adicionado uma variável com a soma dos preços dos contratos que é exibida no fim da tabela.
Desta maneira para as rotas pedidas no enunciado, estás páginas são também geradas.

Em ambas as páginas é criado um header e um footer e um botão Voltar como feito nas aulas práticas