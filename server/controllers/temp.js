
const users = [
    {
        "_id": "63f065753149bc5f0fe642ca",
        "name": "jagan",
        "email": "jagan@gmail.com",
        "password": "$2a$10$9P43pXa7V5KBrw5M6cwPveXz1FT7tTInQd9WV4Y5dS1KRhicRscHC",
        "role": "user",
        "createdAt": "2023-02-18T05:43:17.744Z",
        "updatedAt": "2023-02-18T05:43:17.744Z",
        "__v": 0,
        "userInfo": [
            {
                "_id": "63f065753149bc5f0fe642ca",
                "firstName": "Jagan",
                "lastName": "Raj C J",
                "__v": 0,
                "createdAt": "2023-02-25T18:15:43.240Z",
                "updatedAt": "2023-02-25T18:15:43.240Z"
            }
        ]
    },
    {
        "_id": "63f4563331993028c2b754f6",
        "name": "Navya",
        "email": "navya@gmail.com",
        "password": "$2a$10$yUyRMJSjhdTeh47UnfQ8eetQb2/kwBJylglZDA3w5y/2BciTUyc3e",
        "role": "admin",
        "createdAt": "2023-02-21T05:27:15.148Z",
        "updatedAt": "2023-02-21T05:27:15.148Z",
        "__v": 0,
        "userInfo": [
            {
                "_id": "63f4563331993028c2b754f6",
                "firstName": "jagan",
                "lastName": "Raj C J",
                "__v": 0,
                "createdAt": "2023-02-25T17:57:25.972Z",
                "updatedAt": "2023-02-25T17:57:25.972Z"
            }
        ]
    },
    {
        "_id": "63fa4851d24cd585fd6cac3d",
        "name": "jagan",
        "email": "jagan2@gmail.com",
        "password": "123456",
        "role": "user",
        "__v": 0,
        "createdAt": "2023-02-25T17:41:37.460Z",
        "updatedAt": "2023-02-25T17:41:37.460Z",
        "userInfo": []
    },
    {
        "_id": "63fa4851d24cd585fd6cac3e",
        "name": "Earnest4",
        "email": "earnest4@gmail.com",
        "password": "pass",
        "role": "user",
        "__v": 0,
        "createdAt": "2023-02-25T17:41:37.461Z",
        "updatedAt": "2023-02-25T17:41:37.461Z",
        "userInfo": []
    },
    {
        "_id": "63fa4851d24cd585fd6cac3f",
        "name": "Albert",
        "email": "albertsailus@gmail.com",
        "password": "pass",
        "role": "user",
        "__v": 0,
        "createdAt": "2023-02-25T17:41:37.461Z",
        "updatedAt": "2023-02-25T17:41:37.461Z",
        "userInfo": []
    },
    {
        "_id": "63fa4851d24cd585fd6cac40",
        "name": "Levi",
        "email": "gothem@gmail.com",
        "password": "pass",
        "role": "user",
        "__v": 0,
        "createdAt": "2023-02-25T17:41:37.461Z",
        "updatedAt": "2023-02-25T17:41:37.461Z",
        "userInfo": []
    },
    {
        "_id": "63fa4851d24cd585fd6cac41",
        "name": "Magnus",
        "email": "carlsenmagnus@gmail.com",
        "password": "$2a$10$9P43pXa7V5KBrw5M6cwPveXz1FT7tTInQd9WV4Y5dS1KRhicRscHC",
        "role": "admin",
        "__v": 0,
        "createdAt": "2023-02-25T17:41:37.461Z",
        "updatedAt": "2023-02-25T17:41:37.461Z",
        "userInfo": []
    },
    {
        "_id": "63fa4851d24cd585fd6cac42",
        "name": "Hikaru",
        "email": "gmhikaru@gmail.com",
        "password": "pass",
        "role": "user",
        "__v": 0,
        "createdAt": "2023-02-25T17:41:37.462Z",
        "updatedAt": "2023-02-25T17:41:37.462Z",
        "userInfo": []
    },
    {
        "_id": "63fa4851d24cd585fd6cac43",
        "name": "Giri Anish",
        "email": "gmgiri@gmail.com",
        "password": "pass",
        "role": "user",
        "__v": 0,
        "createdAt": "2023-02-25T17:41:37.462Z",
        "updatedAt": "2023-02-25T17:41:37.462Z",
        "userInfo": []
    },
    {
        "_id": "63fa4851d24cd585fd6cac44",
        "name": "Nelson",
        "email": "nelsonlopez@gmail.com",
        "password": "pass",
        "role": "admin",
        "__v": 0,
        "createdAt": "2023-02-25T17:41:37.463Z",
        "updatedAt": "2023-02-25T17:41:37.463Z",
        "userInfo": []
    }
]

// console.log(users)

let userInfo = {}
users.forEach((user) => {
    if (user.userInfo.length) {
        let newUser = user
        // console.log("🚀 ~ file: temp.js:140 ~ users.forEach ~ user:", user)
        let userInfo = JSON.parse(JSON.stringify(user.userInfo))
        delete userInfo['_id']
        delete userInfo.__v
        delete userInfo.createdAt
        delete userInfo.updatedAt
        delete newUser.userInfo
        newUser = JSON.parse(JSON.stringify(newUser))
        // console.log(newUser)
        // console.log(userInfo)
        console.log({ ...userInfo, ...newUser })
    }
    // else console.log('no userinfo found')
})