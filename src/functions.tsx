import React from "react";
import CustomCard from './components/CustomCard';
import { MessagesBarChart } from './components/MessagesBarChart';

export const TextAnalyser = (input: string) => {

    let dates = new Map<string, number>();
    let times = new Map<string, number>();
    let messagesPerPerson = new Map<string, string[]>();

    //Regex for catching (0: Entire message, 1: Date, 2: Time, 3: Name, 4: Message)
    let regex = new RegExp(/(\d{2}\/\d{2}\/\d{4}),\s(\d(?:\d)?:\d{2})\s-\s([^:]*):\s(.*?)(?=\s*\d{2}\/|$)/gs)
    let m;

    while((m = regex.exec(input)) !== null) {
        if (m.index === regex.lastIndex) {
            regex.lastIndex++
        }

        let user: string = ""
        m.forEach((match, groupIndex) => {
            switch(groupIndex) {
                case 1:
                    // Count occurrences of dates
                    dates.set(match, (dates.get(match) ?? 0) + 1)
                    break
                case 2:
                    times.set(match, (times.get(match) ?? 0) + 1)
                    break
                case 3:
                    // if person is not in map yet, add them
                    if(!messagesPerPerson.has(match)) {
                        messagesPerPerson.set(match, [])
                    }
                    // set user for adding message in case 4
                    user = match;
                    break
                case 4:
                    // add message to user in map
                    let messages: [string] = messagesPerPerson.get(user)
                    messages.push(match.replace("\r\n", " "))
                    messagesPerPerson.set(user, messages)
                default:
                    break
                    
            }
        });
    }

    return CreateCards(dates, times, messagesPerPerson);

}

export const CreateCards = (dates: Map<string, number>, times: Map<string, number>, messagesPerPerson: Map<string, string[]>) => {
    
    let totalMessages = 0
    dates.forEach((value) => totalMessages += value)

    let highestOccurence = dates.entries().next().value;
    dates.forEach((value, key) => value > highestOccurence[1] ?? (highestOccurence = [value, key]))

    let messages: number[] = []
    let names: string[] = []
    messagesPerPerson.forEach((value, key) => {
        messages.push(value.length)
        names.push(key)
    })

    return (
        <>
            <CustomCard title="Contributions">
                <MessagesBarChart messages={messages} names={names}/>
            </CustomCard>
            <CustomCard title="Total Messages">
                <h1>{totalMessages}</h1>
            </CustomCard>
            <CustomCard title="Most popular date">
                <h1>{highestOccurence[0]}</h1>
                <p>{highestOccurence[1]} Messages</p>
            </CustomCard>

        </>
    )
}