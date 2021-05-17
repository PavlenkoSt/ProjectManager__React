const constructLinkFromProjectName = (name: string) => {
    let result = ''
    const arr = name.split(' ')
    arr.forEach(el => el.toLowerCase())
    
    if(arr.length > 1){
        result = arr.join('-')
    }else{
        result = arr.join('')
    }
    return result
}

export default constructLinkFromProjectName