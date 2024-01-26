import { useEffect } from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import { useCallback } from 'react';

function App() {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(8);
  const [numberApplied, setNumberApplied] = useState(false);
  const [characterApplied, setCharacterApplied] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  /**
   * useRef Hook
   */
  const passRef = useRef(null);

  /**
   * useCallback Hook
   * Create Method For Password Generator
   */
  const passwordGenerator = useCallback(() => {
    let pass = '';
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

    if (numberApplied) str += '0123456789';

    if (characterApplied) str += '!@#$%^&*()-_=+[{]};:",<.>/?`~';

    for (let index = 0; index < length; index++) {
      let char = Math.floor(Math.random() * str.length + 1);
      console.log(pass);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberApplied, characterApplied, setPassword]);

  /**
   * useCallback Hook
   * Create Method For Copy Password On ClipBoard
   */
  const copyPasswordOnClipBoard = useCallback(() => {
    passRef.current?.select();
    passRef.current?.setSelectionRange(0, length);
    window.navigator.clipboard.writeText(password);
    setIsCopied(true);
  }, [password]);

  /**
   * useEffect Hook
   */
  useEffect(() => {
    passwordGenerator();
    setIsCopied(false);
  }, [length, numberApplied, characterApplied]);

  return (
    <>
      <div className="w-full max-w-lg mx-auto shadow-lg rounded-2xl p-6 my-10 bg-slate-950 border border-slate-800">
        <h1 className="text-3xl text-red-400 text-center">
          Password Generator{' '}
          <span className={`${isCopied ? 'animate-pulse' : 'animate-none'}`}>
            🔑
          </span>
        </h1>
        <div className="flex shadow-md rounded-lg overflow-hidden my-4 text-red-400">
          <input
            type="text"
            className="w-full outline-none py-2 px-3 font-bold bg-slate-700 cursor-not-allowed"
            value={password}
            ref={passRef}
            readOnly
          />
          <button
            className={`outline-none bg-red-500 px-3 py-2 shrink-0 cursor-pointer font-medium hover:bg-red-400 ${
              isCopied ? 'text-yellow-100' : 'text-white'
            }`}
            onClick={copyPasswordOnClipBoard}
          >
            {isCopied ? 'Copied' : 'Copy'}
          </button>
        </div>
        <div className="flex text-sm gap-2 flex-wrap">
          <div className="flex gap-x-3 flex-wrap">
            <input
              type="range"
              className="bg-red-400"
              value={length}
              min={6}
              max={100}
              onChange={(e) => setLength(e.target.value)}
            />
            <label className="text-red-400">Length: {length}</label>
          </div>
          <div className="flex gap-x-3 flex-wrap">
            <input
              type="checkbox"
              defaultChecked={numberApplied}
              onChange={() => setNumberApplied((prev) => !prev)}
            />
            <label className="text-red-400">Numbers</label>
          </div>
          <div className="flex gap-x-3 flex-wrap">
            <input
              type="checkbox"
              defaultChecked={numberApplied}
              onChange={(e) => setCharacterApplied((prev) => !prev)}
            />
            <label className="text-red-400">Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
