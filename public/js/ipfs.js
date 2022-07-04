
    {/* connect to Moralis server */}

    const serverUrl = "https://sez9urwdadgw.usemoralis.com:2053/server";
    const appId = "2hGujipcMhIQo1db0enmakIbAXp1LEOnuvO8E4FU";
    Moralis.start({ serverUrl, appId });

    {/* Login function */}
    login = async (e) => {
        Moralis.authenticate().then(function (user) {
            e.preventDefault()
            console.log('Logged in')
        })
    }

    //Upload an image
    uploadImage = async () => {
        const data = fileInput.files[0]
        const file = new Moralis.File(data.name, data)
        await file.saveIPFS({useMasterKey:true});
        
        console.log(file.ipfs(), file.hash())
        return file.ipfs();
    }
    
    //Upload metadata object
    uploadMetadata = async (imageURL) => {

        const name = document.getElementById('fileName').value;
        const description = document.getElementById('fileDescription').value;

        const metadata = {
            "filename": name,
            "description": description,
            "url": imageURL
        }
        var hashValue=document.getElementById('hash');
        hashValue.value=imageURL

        console.log(metadata)
        const file = new Moralis.File("file.json", {base64 : btoa(JSON.stringify(metadata))});
        await file.saveIPFS({useMasterKey:true});

        console.log(file.ipfs());
    
    }
    
    //Function to gogogo
    gogogo = async () => {
        console.log("Hello world")
        const image = await uploadImage();
        await uploadMetadata(image);
    }
