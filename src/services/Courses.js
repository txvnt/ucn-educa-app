export async function getCourses(){ 
    return fetch(`https://ucn-online-app.herokuapp.com/`)
    .then(response => response.json())
    .catch(e => console.log(e))
}

export async function getDocuments(courseId){ 
    return fetch(`https://ucn-online-app.herokuapp.com/document.php?cidReq=${courseId}`)
    .then(response => response.json())
    .catch(e => console.log(e))
}

export async function getDocumentsFolder(fileId, courseId){ 
    return fetch(`https://ucn-online-app.herokuapp.com/document.php?cmd=exChDir&file=${fileId}&cidReq=${courseId}`)
    .then(response => response.json())
    .catch(e => console.log(e))
}

export async function getDocument(url, courseId){ 
    return fetch(`https://ucn-online-app.herokuapp.com/download.php?url=${url}&cidReq=${courseId}`)
}