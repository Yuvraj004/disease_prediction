import { Inter } from "next/font/google";
import { useState } from "react";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [fullname,setFullName] = useState("");
  const [sex,setSex] = useState(0);
  const [age,setAge] = useState(0);
  const [chestpaintype,setChestPainType] = useState(0);
  const [restingbp,SetRestingBP] = useState(0);
  const [cholesterol,SetCholesterol] = useState(0);
  const [bloodsugar, SetBloodSugar] = useState(0);
  const [maxheartrate,SetMaxHeartRate] = useState(0);
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <section></section>
      <section>
        <form className="w-full max-w-sm">
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label
                className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                for="inline-full-name"
              >
                Full Name
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                id="inline-full-name"
                type="text"
                value={fullname}
                onChange={(e)=>setFullName(e.target.value)}
              />
            </div>
          </div>
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label
                className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                for="inline-password"
              >
                Sex
              </label>
            </div>
            <div className="md:w-2/3">
              <div className="flex items-center space-x-4">
                <input type="radio" id="option1" name="radio-group" value="1" className="focus:ring-indigo-500 focus:ring-opacity-50 h-4 w-4 text-indigo-600 border-gray-300 rounded"/>
                <label for="option1" className="text-sm font-medium text-gray-700">male</label>
                
                <input type="radio" id="option2" name="radio-group" value="0" className="focus:ring-indigo-500 focus:ring-opacity-50 h-4 w-4 text-indigo-600 border-gray-300 rounded"/>
                <label for="option2" className="text-sm font-medium text-gray-700">female</label>
              </div>
            </div>
          </div>
          
          <div className="md:flex md:items-center mb-6"> 
            <div className="md:w-1/3">
              <label for="age" className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">Age</label>
            </div>
            <div className="md:w-2/3">
              <input type="number" id="age" name="age" min="1" className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"/>
            </div>
          </div>

          <div class="md:flex md:items-center mb-6">
            <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="grid-state">
              Chest Pain Type
            </label>
            <div class="relative">
              <select id="grid-state" class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>

              <input type="hidden" id="selected-value"/>

              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg class="fill-current h-4 w-4 ml-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
            </div>
          </div>

          <div className="md:flex md:items-center mb-6"> 
            <div className="md:w-1/3">
              <label for="bp" className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">Resting BP</label>
            </div>
            <div className="md:w-2/3">
              <input type="number" id="bp" name="bp" value={Number} min="1" className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"/>
            </div>
          </div>

          <div className="md:flex md:items-center mb-6"> 
            <div className="md:w-1/3">
              <label for="cholesterol" className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">Cholesterol</label>
            </div>
            <div className="md:w-2/3">
              <input type="number" id="cholesterol" name="cholesterol" value={Number} min="1" className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"/>
            </div>
          </div>

          <div className="md:flex md:items-center mb-6"> 
            <div className="md:w-1/3">
              <label for="blood_sugar" className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">Blood Sugar</label>
            </div>
            <div className="md:w-2/3">
              <input type="number" id="blood_sugar" name="blood_sugar" value={Number} min="1" className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"/>
            </div>
          </div>

          <div className="md:flex md:items-center mb-6"> 
            <div className="md:w-1/3">
              <label for="max_heart_rate" className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">Max Heart Rate</label>
            </div>
            <div className="md:w-2/3">
              <input type="number" id="max_heart_rate" name="max_heart_rate" value={Number} min="1" className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"/>
            </div>
          </div>

          <div className="md:flex md:items-center">
            <div className="md:w-1/3"></div>
            <div className="md:w-2/3">
              <button
                className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                type="button"
              >
                Predict
              </button>
            </div>
          </div>
        </form>
      </section>
    </main>
  );
}
