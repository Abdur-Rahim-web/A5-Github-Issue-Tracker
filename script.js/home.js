const allIssueContainer = document.getElementById('allIssue-container');
const totalIssue = document.getElementById('total-issue');
const loadingSpinner = document.getElementById('loadingSpinner');
const modalContainer = document.getElementById('modal-container');

const modalTitle = document.getElementById('modal-title');
const modalStatus = document.getElementById('modal-status');
const modalStatus1 = document.getElementById('modal-status1');
const modalAuthor = document.getElementById('modal-author');
const modalUpdatedAt = document.getElementById('modal-updatedAt');
const modalDescription = document.getElementById('modal-description');
const modalAssignee = document.getElementById('modal-assignee');
const modalPriority = document.getElementById('modal-priority');


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
    allIssuesData = data.data;
    hiddenLoading();
    displayAllIssue(allIssuesData);
}


function displayAllIssue(issues){
    issues.forEach(issue => {
        const card = document.createElement('div');
        card.innerHTML= `<div class="p-4 bg-white rounded-md shadow-md space-y-2 h-100 ${issue.status=='open'?'border-t-green-500':'border-t-purple-500'} border-t-2">
                <div class="flex justify-between items-center">
                    <img src="assets/Open-Status.png" alt="">
                    <button class="btn btn-soft btn-secondary ${issue.priority=='medium'?'bg-[#FFF6D1] text-[#F59E0B]':''} ${issue.priority=='low'?'bg-[#EEEFF2] text-[#9CA3AF]':''}">${issue.priority}</button>
                </div>

                <h2 class="text-2xl font-bold">${issue.title}</h2>
                <p class="line-clamp-2">${issue.description}</p>

                <div class="flex gap-2 items-center">
                    <button class="btn btn-soft btn-secondary"><i class="fa-solid fa-bug"></i> Bug</button>
                    <button class="btn btn-soft btn-warning"><img class="w-4 h-4" src="assets/help.png" alt="">help wanted</button>
                </div>

                <hr>

                <p>${issue.author}</p>
                <p>${issue.updatedAt}</p>
                <button class="btn btn-soft btn-info" onclick=openIssuesModal(${issue.id})>Details</button>
                
            </div>`;
        allIssueContainer.appendChild(card);
    });
    totalIssue.innerText = allIssueContainer.children.length;
}

//filter function for open btn
function showOpenIssues(){
    const openIssues = allIssuesData.filter(issue => issue.status === "open");

    allIssueContainer.innerHTML = "";
    displayAllIssue(openIssues);
}

//filter function for closed btn
function showClosedIssues(){
    const closedIssues = allIssuesData.filter(issue => issue.status === "closed");

    allIssueContainer.innerHTML = "";
    displayAllIssue(closedIssues);
}

//filter function for all btn
function showAllIssues(){
    allIssueContainer.innerHTML = "";
    displayAllIssue(allIssuesData);
}


async function openIssuesModal(issueId){
    console.log(issueId)
    const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${issueId}`) 
    const Data = await res.json()
    const issueDetails = Data.data;
    console.log(issueDetails) 
    modalContainer.showModal();

    modalTitle.textContent = issueDetails.title;
    modalStatus.textContent = issueDetails.status;
    modalStatus1.textContent = issueDetails.status;
    modalAuthor.textContent = issueDetails.author;
    modalUpdatedAt.textContent = issueDetails.updatedAt;
    modalDescription.textContent = issueDetails.description;
    modalAssignee.textContent = issueDetails.assignee;
    modalPriority.textContent = issueDetails.priority;

    modalPriority.classList = `${issueDetails.priority=='high'?'btn btn-soft btn-secondary rounded-full':''} ${issueDetails.priority=='medium'?'btn bg-[#FFF6D1] text-[#F59E0B] rounded-full':''} ${issueDetails.priority=='low'?'btn bg-[#FECACA] text-gray rounded-full':''}`;
}


loadAllIssues();