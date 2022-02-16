const formLoginDOM = document.getElementById('form-login')
const dashboardDOM = document.getElementById('dashboard')

const token = localStorage.getItem('token')
if (!token)
    formLoginDOM.classList.remove('hidden')
else
    dashboardDOM.classList.remove('hidden')

formLoginDOM.addEventListener('submit', async (e) => {
    e.preventDefault()
    try {
        const formLoginUsernameDOM = document.getElementById('form-login--username')
        const formLoginPasswordDOM = document.getElementById('form-login--password')
        const { data } = await axios.post('api/v1/login', {
            name: formLoginUsernameDOM.value,
            password: formLoginPasswordDOM.value
        })
        localStorage.setItem('token', data.token)
        formLoginDOM.classList.add('hidden')
        dashboardDOM.classList.remove('hidden')
        formLoginUsernameDOM.value = ''
        formLoginPasswordDOM.value = ''
    }
    catch (error) {
        const formLoginErrorMsg = document.getElementById('form-login--error-msg')
        formLoginErrorMsg.classList.remove('hidden')
        formLoginErrorMsg.innerText = error
        setTimeout(() => formLoginErrorMsg.classList.add('hidden'), 3000)
    }
})

const dashboardBtnDOM = document.getElementById('dashboard--btn')

dashboardBtnDOM.addEventListener('click', async (e) => {
    try {
        const token = localStorage.getItem('token')
        const { data } = await axios.get('api/v1/dashboard', {
            headers: {
                authorization: `Bearer ${token}`
            }
        })
        const { name, number } = data
        const dashboardMsgDOM = document.getElementById('dashboard--msg')
        dashboardMsgDOM.innerText = `Hello ${name}, your lucky number is ${number}`
    }
    catch (error) {
        const dashboardErrorMsg = document.getElementById('dashboard--error-msg')
        dashboardErrorMsg.classList.remove('hidden')
        dashboardErrorMsg.innerText = error
        setTimeout(() => dashboardErrorMsg.classList.add('hidden'), 3000)
    }
})

const dashboardLogout = document.getElementById('dashboard--logout')
dashboardLogout.addEventListener('click', () => {
    localStorage.removeItem('token')
    dashboardDOM.classList.add('hidden')
    formLoginDOM.classList.remove('hidden')
})