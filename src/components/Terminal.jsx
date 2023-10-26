import { useState, useRef, useEffect } from 'react';
import '../terminal.css';

function Terminal() {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState([]);
    const [filesAndDirectories, setFilesAndDirectories] = useState(['file1.txt', 'file2.txt', 'directory1', 'directory2']);
    const inputRef = useRef();

    useEffect(() => {
        inputRef.current.focus();
    }, []);


    const handleInput = (e) => {
        if (e.key === 'Enter') {
            processCommand(input);
            setInput('');
        }
    };

    // const clearScreen = () => {
    // setOutput([]);
    // };


    const updateFilesAndDirectories = (newFilesAndDirs) => {
        setFilesAndDirectories(newFilesAndDirs);
    };



    const commandManuals = {
        help:
            'help - Show available commands.\n' +
            'about - Information about this terminal.\n' +
            'contact - Contact information.\n' +
            'ls - List files and directories.\n' +
            'addfile [filename] - Add a file to the list.\n' +
            'adddirectory [dirname] - Add a directory to the list.\n' +
            'man [command] - Display the manual page for a command.',

        about: 'This is a simple React terminal.',

        contact: 'Contact us at contact@example.com',

        ls: 'ls - List files and directories.',

        addfile: 'addfile [filename] - Add a file to the list.',

        adddirectory: 'adddirectory [dirname] - Add a directory to the list.',

        man: 'man [command] - Display the manual page for a command.',
    };


    const processCommand = (command) => {
        // Handle your commands here
        let response = '';
        const commandParts = command.trim().split(' ');
        if (command.trim().toLowerCase() === 'clear') {
            clearScreen();
            return;
        }
        switch (commandParts[0].toLowerCase()) {
            case 'help':
                response = (
                    < pre >
                        Hello
                        <b></b>
                        List of commands available
                        <br />
                        ====================
                        <br />
                        {'>'} about
                        <br />
                        {'>'} contact
                        <br />
                        {'>'} echo -----------
                        <br />
                        {'>'} pwd ------------
                        <br />
                        {'>'} ls -------------
                        <br />
                        {'>'} cat ------------
                        <br />
                        {'>'} mkdir ----------
                        <br />
                        {'>'} clear ----------
                        <br />
                        {'>'} uname ----------
                        <br />
                        {'>'} date  ----------
                        <br />
                        {'>'} ifconfig -------
                        <br />
                        {'>'} tty ------------
                    </pre >
                );
                break;
            case 'about':
                response = 'This is a simple React terminal.';
                break;
            case 'contact':
                response = 'Contact us at contact@example.com \n' + `${commandManuals.contact}`;
                break;
            case 'pwd':
                response = 'Current Working Directory: ' + 'your/dafasd/adsfasd';
                break;
            case 'uname':
                response = `System Information:\nOS: ${navigator.platform}\nBrowser: ${navigator.appName}`;
                break;
            case 'ifconfig':
                response = `eth0: 192.168.0.101
                            wlan0: 192.168.1.100`;
                break;
            case 'tty':
                response = 'Connected to /dev/tty1';
                break;
            case 'date':
                response = `Current date and time: ${new Date().toUTCString()}`;
                break;
            case 'ls':
                response = 'Files and Directories:\n' + filesAndDirectories.join('\n');
                break;
            case 'cat':
                if (commandParts.length === 2) {
                    const fileName = commandParts[1];
                    // Check if the file exists in the directory listing
                    response = `Contents of ${fileName}: ...`; // Simulated content
                } else {
                    response = 'Usage: cat [filename]';
                }
                break;
            case command.trim().toLowerCase().startsWith('addfile '): {
                const fileName = command.substring(8);
                updateFilesAndDirectories([...filesAndDirectories, fileName]);
                response = `Added file: ${fileName}`;
                break;
            }
            case command.trim().toLowerCase().startsWith('adddirectory '): {
                const dirName = command.substring(13);
                updateFilesAndDirectories([...filesAndDirectories, dirName]);
                response = `Added directory: ${dirName}`;
                break;
            }
            default:
                if (command.trim().toLowerCase().startsWith('echo ')) {
                    const message = command.substring(5); // Remove "echo " from the command to get the message
                    response = message;
                } else {
                    response = `Command not recognized: ${command}`;
                }
        }

        setOutput([...output, { input: `user@localhost$: ${command}`, output: response }]);
    };



    const clearScreen = () => {
        setOutput([]);
    };



    return (
        <div className="terminal">
            All rights reserved to the owner ©bhavy03
            <br />
            We ❤  Open Source
            <br />
            If you want to contribute, you can at github @bhavy03.
            <br />
            Type  help to get started
            <br />
            The shell is basically a program that takes your commands from the keyboard and sends them to the operating system to perform.
            <br />
            The Terminal is a program that launches a shell for you.
            <br />
            Type help to see the list of commands/tasks.
            <br />
            <br />
            Start with echo any string.
            <div className="output-container">
                {output.map((item, index) => (
                    <div key={index} className="output">
                        <span style={{color:'#00ff00'}}> {item.input}</span>
                        <p className='into'>{item.output}</p>
                    </div>
                ))}
                <div className='input-container'>
                    <span style={{ color: '#00ff00' }}>user@localhost$:</span>
                    <input
                        ref={inputRef}
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={handleInput}
                    />
                </div>
            </div>
        </div>
    );
}

export default Terminal;
