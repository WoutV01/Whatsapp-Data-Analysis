import { useState } from 'react';
import { TextAnalyser } from './functions';
import CustomCard from './components/CustomCard';



export default function App() {

    const [cards, setCards] = useState(null)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        console.log(e)

        //If no file has been entered
        if(!e.target.files || !e.target) {
            console.log("No file entered")
            return
        }

        //If a non-txt file has been entered
        if(e.target.files[0].type != "text/plain") {
            //TODO give proper error
            console.log("Non-txt file entered")
            return
        }

        //Read the file and pass it on to the textAnalyser
        const reader = new FileReader();
        reader.onload = async (e) => {
            console.log("Processing...")
            const text: string = (e.target?.result) as string;
            let result = TextAnalyser(text);
            setCards(result)
        }
        reader.readAsText(e.target.files[0])
    }

    return (
        <>
            <div className="titleDiv">
                <h1>Whatsapp Data Analyser</h1>
            </div>
            <div className="insertPrompt">
                <h5>Insert your .txt file from the Whatsapp export</h5>
                <input type="file" accept=".txt" id="file" name="file" onChange={(e) => handleChange(e)}/>
            </div>
            <main className="container">
                <div className="grid">
                    {cards}
                </div>
            </main>
        </>
    )
}