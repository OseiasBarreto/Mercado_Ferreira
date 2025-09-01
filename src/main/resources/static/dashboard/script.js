const { jsPDF } = window.jspdf;

// Elementos do DOM
const tableBody = document.getElementById('tableBody');
const searchInput = document.getElementById('search');
const categoryFilter = document.getElementById('categoryFilter');
const prevPageBtn = document.getElementById('prevPage');
const nextPageBtn = document.getElementById('nextPage');
const pageInfo = document.getElementById('pageInfo');
const exportCSVBtn = document.getElementById('exportCSV');
const exportPDFBtn = document.getElementById('exportPDF');

const totalProductsSpan = document.getElementById('totalProducts');
const totalQuantitySpan = document.getElementById('totalQuantity');
const totalCategoriesSpan = document.getElementById('totalCategories');
const lowStockSpan = document.getElementById('lowStock');

let currentPage = 1;
const rowsPerPage = 10;

// Tooltip customizado
const tooltip = document.createElement('div');
tooltip.className = 'custom-tooltip';
document.body.appendChild(tooltip);
tooltip.style.position = 'absolute';
tooltip.style.padding = '8px';
tooltip.style.background = 'rgba(0,0,0,0.8)';
tooltip.style.color = '#fff';
tooltip.style.borderRadius = '8px';
tooltip.style.fontSize = '12px';
tooltip.style.pointerEvents = 'none';
tooltip.style.transition = 'all 0.2s ease';
tooltip.style.opacity = 0;

function showTooltip(e, html) {
    tooltip.innerHTML = html;
    tooltip.style.left = e.pageX + 15 + 'px';
    tooltip.style.top = e.pageY + 15 + 'px';
    tooltip.style.opacity = 1;
}

function hideTooltip() {
    tooltip.style.opacity = 0;
}

// Produtos fictícios (30 itens)
const products = [
    {id:1,nome:"Hambúrguer Clássico",preco:25,qnt:10,data:"20/08/2025",fornecedor:"Fornecedor Alpha",categoria:"Lanches",descricao:"Hambúrguer artesanal com queijo e alface"},
    {id:2,nome:"Pizza Margherita",preco:40,qnt:5,data:"18/08/2025",fornecedor:"Fornecedor Beta",categoria:"Lanches",descricao:"Pizza tradicional com tomate, queijo e manjericão"},
    {id:3,nome:"Suco de Laranja",preco:8,qnt:50,data:"22/08/2025",fornecedor:"Fornecedor Gama",categoria:"Bebidas",descricao:"Suco natural de laranja"},
    {id:4,nome:"Refrigerante Cola",preco:6,qnt:100,data:"21/08/2025",fornecedor:"Fornecedor Delta",categoria:"Bebidas",descricao:"Refrigerante cola 350ml"},
    {id:5,nome:"Bolo de Chocolate",preco:15,qnt:8,data:"20/08/2025",fornecedor:"Fornecedor Épsilon",categoria:"Sobremesas",descricao:"Bolo caseiro de chocolate com cobertura"},
    {id:6,nome:"Pastel de Queijo",preco:12,qnt:20,data:"19/08/2025",fornecedor:"Fornecedor Zeta",categoria:"Lanches",descricao:"Pastel frito recheado com queijo"},
    {id:7,nome:"Milkshake Morango",preco:18,qnt:15,data:"18/08/2025",fornecedor:"Fornecedor Eta",categoria:"Bebidas",descricao:"Milkshake cremoso de morango"},
    {id:8,nome:"Churros",preco:10,qnt:12,data:"20/08/2025",fornecedor:"Fornecedor Theta",categoria:"Sobremesas",descricao:"Churros recheados com doce de leite"},
    {id:9,nome:"Fritas Crocantes",preco:9,qnt:25,data:"21/08/2025",fornecedor:"Fornecedor Iota",categoria:"Lanches",descricao:"Batata frita crocante temperada"},
    {id:10,nome:"Copo Reutilizável",preco:5,qnt:40,data:"22/08/2025",fornecedor:"Fornecedor Kappa",categoria:"Acessórios",descricao:"Copo plástico reutilizável 500ml"},
    {id:11,nome:"Hambúrguer Vegano",preco:28,qnt:6,data:"21/08/2025",fornecedor:"Fornecedor Alpha",categoria:"Lanches",descricao:"Hambúrguer à base de grão-de-bico"},
    {id:12,nome:"Suco de Maçã",preco:7,qnt:30,data:"22/08/2025",fornecedor:"Fornecedor Gama",categoria:"Bebidas",descricao:"Suco natural de maçã"},
    {id:13,nome:"Donut Chocolate",preco:8,qnt:20,data:"20/08/2025",fornecedor:"Fornecedor Épsilon",categoria:"Sobremesas",descricao:"Donut coberto com chocolate"},
    {id:14,nome:"Pizza Calabresa",preco:45,qnt:4,data:"18/08/2025",fornecedor:"Fornecedor Beta",categoria:"Lanches",descricao:"Pizza com calabresa e queijo"},
    {id:15,nome:"Refrigerante Limão",preco:6,qnt:80,data:"21/08/2025",fornecedor:"Fornecedor Delta",categoria:"Bebidas",descricao:"Refrigerante sabor limão 350ml"},
    {id:16,nome:"Sanduíche Natural",preco:20,qnt:15,data:"22/08/2025",fornecedor:"Fornecedor Eta",categoria:"Lanches",descricao:"Pão integral com frango e salada"},
    {id:17,nome:"Sorvete Casquinha",preco:7,qnt:25,data:"20/08/2025",fornecedor:"Fornecedor Theta",categoria:"Sobremesas",descricao:"Sorvete de baunilha em casquinha"},
    {id:18,nome:"Água Mineral 500ml",preco:3,qnt:120,data:"22/08/2025",fornecedor:"Fornecedor Delta",categoria:"Bebidas",descricao:"Água mineral sem gás"},
    {id:19,nome:"Pizza Quatro Queijos",preco:50,qnt:6,data:"18/08/2025",fornecedor:"Fornecedor Beta",categoria:"Lanches",descricao:"Pizza com quatro tipos de queijo"},
    {id:20,nome:"Café Expresso",preco:5,qnt:60,data:"22/08/2025",fornecedor:"Fornecedor Gama",categoria:"Bebidas",descricao:"Café expresso quente"},
    {id:21,nome:"Brownie",preco:12,qnt:10,data:"20/08/2025",fornecedor:"Fornecedor Épsilon",categoria:"Sobremesas",descricao:"Brownie de chocolate com nozes"},
    {id:22,nome:"Wrap de Frango",preco:22,qnt:18,data:"21/08/2025",fornecedor:"Fornecedor Alpha",categoria:"Lanches",descricao:"Wrap recheado com frango grelhado e salada"},
    {id:23,nome:"Suco Detox",preco:9,qnt:20,data:"22/08/2025",fornecedor:"Fornecedor Gama",categoria:"Bebidas",descricao:"Suco verde detox com couve e maçã"},
    {id:24,nome:"Pão de Queijo",preco:4,qnt:50,data:"20/08/2025",fornecedor:"Fornecedor Zeta",categoria:"Lanches",descricao:"Pão de queijo tradicional"},
    {id:25,nome:"Cookie de Chocolate",preco:6,qnt:30,data:"20/08/2025",fornecedor:"Fornecedor Épsilon",categoria:"Sobremesas",descricao:"Cookie crocante com gotas de chocolate"},
    {id:26,nome:"Refrigerante Guaraná",preco:6,qnt:90,data:"21/08/2025",fornecedor:"Fornecedor Delta",categoria:"Bebidas",descricao:"Refrigerante Guaraná 350ml"},
    {id:27,nome:"Copo Térmico",preco:15,qnt:25,data:"22/08/2025",fornecedor:"Fornecedor Kappa",categoria:"Acessórios",descricao:"Copo térmico 300ml"},
    {id:28,nome:"Hambúrguer Bacon",preco:30,qnt:8,data:"21/08/2025",fornecedor:"Fornecedor Alpha",categoria:"Lanches",descricao:"Hambúrguer com bacon e queijo cheddar"},
    {id:29,nome:"Sorvete de Morango",preco:7,qnt:20,data:"20/08/2025",fornecedor:"Fornecedor Theta",categoria:"Sobremesas",descricao:"Sorvete de morango cremoso"},
    {id:30,nome:"Pizza Portuguesa",preco:48,qnt:5,data:"18/08/2025",fornecedor:"Fornecedor Beta",categoria:"Lanches",descricao:"Pizza com presunto, ovo e azeitonas"}
];

// Variáveis de gráficos
let barChart, pieChart;

// Renderização da tabela
function renderTable() {
    tableBody.innerHTML = "";
    let filtered = products.filter(p=>{
        const searchText = searchInput.value.toLowerCase();
        const category = categoryFilter.value;
        const matchSearch = p.nome.toLowerCase().includes(searchText) || p.fornecedor.toLowerCase().includes(searchText);
        const matchCategory = category === "" || p.categoria === category;
        return matchSearch && matchCategory;
    });

    const totalPages = Math.ceil(filtered.length / rowsPerPage);
    if(currentPage > totalPages) currentPage = totalPages || 1;

    const start = (currentPage-1)*rowsPerPage;
    const end = start+rowsPerPage;
    filtered.slice(start,end).forEach(p=>{
        const tr = document.createElement("tr");
        tr.innerHTML = `<td>${p.id}</td>
                        <td>${p.nome}</td>
                        <td>${p.preco}</td>
                        <td>${p.qnt}</td>
                        <td>${p.data}</td>
                        <td>${p.fornecedor}</td>
                        <td>${p.categoria}</td>
                        <td>${p.descricao}</td>`;
        tableBody.appendChild(tr);

        tr.querySelector('td:nth-child(2)').addEventListener('mousemove', e=>{
            const text = <strong>${p.nome}</strong><br>Preço: R$ ${p.preco}<br>Qtd: ${p.qnt}<br>Fornecedor: ${p.fornecedor}<br>Categoria: ${p.categoria}<br>Data: ${p.data}<br>Descrição: ${p.descricao};
            showTooltip(e,text);
        });
        tr.querySelector('td:nth-child(2)').addEventListener('mouseleave', hideTooltip);
    });

    pageInfo.textContent = Página ${currentPage} de ${totalPages || 1};
    prevPageBtn.disabled = currentPage === 1;
    nextPageBtn.disabled = currentPage === totalPages || totalPages === 0;

    updateSummary(filtered);
    updateCharts(filtered);
}

// Atualiza mini-dashboard
function updateSummary(filtered){
    totalProductsSpan.textContent = filtered.length;
    totalQuantitySpan.textContent = filtered.reduce((sum,p)=>sum+p.qnt,0);
    totalCategoriesSpan.textContent = [...new Set(filtered.map(p=>p.categoria))].length;
    lowStockSpan.textContent = filtered.filter(p=>p.qnt<10).length;
}

// Export CSV
exportCSVBtn.addEventListener('click',()=>{
    const rows = Array.from(tableBody.rows);
    let csv = [["ID","Nome","Preço","Quantidade","Data de Chegada","Fornecedor","Categoria","Descrição"]];
    rows.forEach(row=>{
        csv.push(Array.from(row.cells).map(td=>td.textContent));
    });
    const csvContent = "data:text/csv;charset=utf-8," + csv.map(e=>e.join(",")).join("\n");
    const link = document.createElement("a");
    link.href = encodeURI(csvContent);
    link.download = "produtos.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});

// Export PDF
exportPDFBtn.addEventListener('click',()=>{
    const doc = new jsPDF();
    const headers = [["ID","Nome","Preço","Quantidade","Data de Chegada","Fornecedor","Categoria","Descrição"]];
    const rows = Array.from(tableBody.rows).map(row=>Array.from(row.cells).map(td=>td.textContent));
    doc.setFontSize(14);
    doc.text("Lista de Produtos",14,20);
    doc.autoTable({head:headers, body:rows, startY:30, theme:'grid'});
    doc.save("produtos.pdf");
});

// Paginação
prevPageBtn.addEventListener('click',()=>{ if(currentPage>1){currentPage--; renderTable(); } });
nextPageBtn.addEventListener('click',()=>{ currentPage++; renderTable(); });

// Filtros
searchInput.addEventListener('input',()=>{currentPage=1; renderTable();});
categoryFilter.addEventListener('change',()=>{currentPage=1; renderTable();});

// Ordenação
document.querySelectorAll('#productTable th').forEach(th=>{
    th.addEventListener('click',()=>{
        const col = parseInt(th.dataset.column);
        const order = th.dataset.order;
        products.sort((a,b)=>{
            const valA = Object.values(a)[col];
            const valB = Object.values(b)[col];
            if(valA>valB) return order==='asc'?1:-1;
            if(valA<valB) return order==='asc'?-1:1;
            return 0;
        });
        th.dataset.order = order==='asc'?'desc':'asc';
        th.innerHTML = th.innerHTML.slice(0,-1)+(order==='asc'?' &#x25B2;':' &#x25BC;');
        renderTable();
    });
});

// Gráficos Chart.js modernos
function updateCharts(filtered){
    const categories = [...new Set(filtered.map(p=>p.categoria))];
    const quantities = categories.map(cat=>filtered.filter(p=>p.categoria===cat).reduce((sum,p)=>sum+p.qnt,0));

    // Barra estilizada
    const ctxBar = document.getElementById('barChart').getContext('2d');
    if(barChart) barChart.destroy();
    barChart = new Chart(ctxBar,{
        type:'bar',
        data:{
            labels:categories,
            datasets:[{
                label:'Quantidade',
                data:quantities,
                backgroundColor: categories.map((_,i)=>rgba(${108+i*20},99,255,0.7)),
                borderRadius: 10,
                borderSkipped: false
            }]
        },
        options:{
            responsive:true,
            plugins:{
                legend:{display:false},
                tooltip:{enabled:true}
            },
            scales:{
                y:{beginAtZero:true}
            }
        }
    });

    // Donut estilizado
    const ctxPie = document.getElementById('pieChart').getContext('2d');
    if(pieChart) pieChart.destroy();
    pieChart = new Chart(ctxPie,{
        type:'doughnut',
        data:{
            labels:categories,
            datasets:[{
                label:'Categorias',
                data:quantities,
                backgroundColor:[
                    'rgba(108,99,255,0.7)',
                    'rgba(75,192,192,0.7)',
                    'rgba(255,205,86,0.7)',
                    'rgba(255,99,132,0.7)'
                ],
                borderWidth:2
            }]
        },
        options:{
            responsive:true,
            plugins:{
                legend:{position:'bottom', labels:{padding:15,font:{size:12}}}
            },
            cutout:'50%'
        }
    });
}

// Inicializa dashboard
document.addEventListener('DOMContentLoaded', () => {
    renderTable();
});