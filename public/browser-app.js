const formLoginDOM = document.getElementById('form-login')
const formLoginUsernameDOM = document.getElementById('form-login--username')
const formLoginPasswordDOM = document.getElementById('form-login--password')
const formLoginErrorMsg = document.getElementById('form-login--error-msg')

const dashboardDOM = document.getElementById('dashboard')
const dashboardBtnDOM = document.getElementById('dashboard--btn')
const dashboardMsgDOM = document.getElementById('dashboard--msg')
const dashboardErrorMsgDOM = document.getElementById('dashboard--error-msg')

const token = localStorage.getItem('token')
if (!token)
    formLoginDOM.classList.remove('hidden')
else
    dashboardDOM.classList.remove('hidden')

formLoginDOM.addEventListener('submit', async (e) => {
    e.preventDefault()
    try {
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
        formLoginErrorMsg.classList.remove('hidden')
        formLoginErrorMsg.innerText = error.response.data.msg
        setTimeout(() => formLoginErrorMsg.classList.add('hidden'), 3000)
    }
})

dashboardBtnDOM.addEventListener('click', async (e) => {
    try {
        const token = localStorage.getItem('token')
        const { data } = await axios.get('api/v1/dashboard', {
            headers: {
                authorization: `Bearer ${token}`
            }
        })
        const { name, number } = data
        dashboardMsgDOM.innerText = `Hello ${name}, your lucky number is ${number}`
    }
    catch (error) {
        dashboardErrorMsgDOM.classList.remove('hidden')
        dashboardErrorMsgDOM.innerText = error.response.data.msg
        setTimeout(() => dashboardErrorMsgDOM.classList.add('hidden'), 3000)
    }
})

const dashboardLogout = document.getElementById('dashboard--logout')
dashboardLogout.addEventListener('click', () => {
    dashboardMsgDOM.innerText = ''
    localStorage.removeItem('token')
    dashboardDOM.classList.add('hidden')
    formLoginDOM.classList.remove('hidden')
})