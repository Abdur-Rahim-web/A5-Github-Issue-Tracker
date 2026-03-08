const allIssueContainer = document.getElementById('allIssue-container');
const totalIssue = document.getElementById('total-issue');
const loadingSpinner = document.getElementById('loadingSpinner');

// for toggleButton
const allBtn = document.getElementById('all-btn');
const openBtn = document.getElementById('open-btn');
const closedBtn = document.getElementById('closed-btn');

function toggleButton(id){
    allBtn.classList.remove('btn-primary','text-white');
    openBtn.classList.remove('btn-primary','text-white');
    closedBtn.classList.remove('btn-primary','text-white');

    allBtn.classList.add('bg-white','text-black');
    openBtn.classList.add('bg-white','text-black');
    closedBtn.classList.add('bg-white','text-black');

    const selected = document.getElementById(id); //jata click hoba sata dorba
    // console.log(selected);

    selected.classList.remove('bg-white','text-black');
    selected.classList.add('btn-primary','text-white');
}


function showLoading(){
    loadingSpinner.classList.remove('hidden');
    allIssueContainer.innerHTML = '';
}

function hiddenLoading(){
    loadingSpinner.classList.add('hidden');
}

async function loadAllIssues(){
    showLoading();
    const res = await fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues');
    const data = await res.json();
    hiddenLoading();
    displayAllIssue(data.data);
}


function displayAllIssue(issues){
    issues.forEach(issue => {
        const card = document.createElement('div');
        card.innerHTML= `<div class="p-4 bg-white rounded-md shadow-md space-y-2 h-100">
                <div class="flex justify-between items-center">
                    <img src="assets/Open-Status.png" alt="">
                    <button class="btn btn-soft btn-secondary">${issue.priority}</button>
                </div>

                <h2 class="text-2xl font-bold">${issue.title}</h2>
                <p >${issue.description}</p>

                <div class="flex gap-2 items-center">
                    <button class="btn btn-soft btn-secondary"><i class="fa-solid fa-bug"></i> Bug</button>
                    <button class="btn btn-soft btn-warning"><img class="w-4 h-4" src="assets/help.png" alt="">help wanted</button>
                </div>

                <hr>

                <p>${issue.author}</p>
                <p>${issue.updatedAt}</p>
            </div>`;
        allIssueContainer.appendChild(card);
    });
    totalIssue.innerText = allIssueContainer.children.length;
}

loadAllIssues();