import {useState} from "react";

function App() {
    const [files, setFiles] = useState([]);


    const handleFileChange = (e) => {
        const filesMapped = [...e.target.files].map((file, id) => ({
            name: file.name.split('.')[0],
            file: file,
            id: id
        }))

        setFiles([...files, ...filesMapped]);
    }

    const handleFileDelete = (index) => {
        return () => {
            setFiles(files.filter((_, i) => i !== index));
        }
    }

    const handleFileNameChange = (index) => {
        return (event) => {
            setFiles(files.map((file, i) => {
                if (i === index) {
                    return {...file, name: event.target.value};
                }
                return file;
            }));
        }
    }

    function handleSubmit(event) {
        event.preventDefault();
        fetch('http://localhost:8001/api/v1/orders/1/files', {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
                'group': 1,
                'files': files.map((item) => {
                    return {...item.file, name: item.name + '.' + item.file.name.split('.')[1]}
                })
            })
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Success:', data);
            })
            .catch((error) => console.log('Error:', error));
    }

    return (
        <div>
            <ul>
                {files.map(({file, name, id}, index) => (
                    <li key={index}>
                        <input type="text" value={name} onChange={handleFileNameChange(index)}/>
                        <button onClick={handleFileDelete(index)}>Delete</button>
                    </li>
                ))}
            </ul>
            <form action="" method="POST" encType="multipart/form-data" onSubmit={handleSubmit}>
                <label htmlFor="files">Upload a files:</label>
                <input
                    type="file"
                    name="file"
                    id="files"
                    multiple
                    accept="image/jpeg"
                    onChange={handleFileChange}
                />

                <input type="submit" value="Upload"/>
            </form>
        </div>
    );
}

export default App;
