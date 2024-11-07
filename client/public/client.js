console.log('Hello from client.js');
async function fetchVtosArca(){
    try{
        const response = await fetch('/fetch-vtos_arca');
        const vtos_arcaList = await response.json();
        console.log(vtos_arcaList);
        
        const root = document.querySelector('.root');
        if (root) {
            root.innerHTML = vtos_arcaList.map(vtos_arca => `
            <h2>${vtos_arca.id}</h2>
            <pre>${JSON.stringify(vtos_arca.data, null, 2)}</pre>
            `).join('');
        }
    } catch(error){
        console.error("Error fetching vtos_arca", error);
    }
}
fetchVtosArca();