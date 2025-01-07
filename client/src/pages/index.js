import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
const inter = Inter({ subsets: ["latin"] });
import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
// import img from "../assets/dp.jpeg";
// import "./loader.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fas } from "@fortawesome/free-solid-svg-icons";

const navigation = [
  { name: 'Dashboard', href: '/', current: true },
  { name: 'Columns', href: '/columns', current: false },
  { name: 'Projects', href: '#', current: false },
  { name: 'Calendar', href: '#', current: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}
export default function Home() {
  const [fullname,setFullName] = useState("");
  const [sex,setSex] = useState(0);
  const [age,setAge] = useState(0);
  const [chestpaintype,setChestPainType] = useState(0);
  const [restingbp,SetRestingBP] = useState(0);
  const [cholesterol,SetCholesterol] = useState(0);
  const [bloodsugar, SetBloodSugar] = useState(0);
  const [max_heart_rate,Setmax_heart_rate] = useState(0);
  const [data,setData]= useState("");
  const BACKEND_URL  = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://predictionbackend.onrender.com' ;
  const [loading, setLoading] = useState(false);
  const handleRadioChange = (event) => {
    setSex(event.target.value);
  };
  const handleChestPainTypeChange = (event) => {
    setChestPainType(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Here, you can send the form data to the backend
    
    const formData = {
      fullname,
      sex,
      age,
      chestpaintype,
      restingbp,
      cholesterol,
      bloodsugar,
      max_heart_rate,
    };
    try {
      // Send the form data to the backend using fetch API
      setLoading(true);
      const response = await fetch(`${BACKEND_URL}/predict_disease`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      console.log(formData);
      // Handle the response from the backend
      if (response.ok) {
        const dataI = await response.json();
        setLoading(false);
        setData(dataI);
        console.log('Prediction result:', dataI);
        // Do something with the prediction result
      } else {
        console.error('Error:', response.status);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.error('Error:', error);
    }
  }
  return (
    <>
      {loading ? (
          <div className="container laptopPos">
            <div><FontAwesomeIcon icon={fas.faDesktop} style={{ fontSize: 100 }}/></div>
            <div className='file'><FontAwesomeIcon icon={fas.faStream} style={{ fontSize: 100,color:'blue' }}/></div>
            <div><FontAwesomeIcon icon={fas.faDesktop} style={{ fontSize: 100 }}/></div>
          </div>
        ) : (
        <>
          <Disclosure as="nav" className="bg-gray-800">
              {({ open }) => (
                <>
                  <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                    <div className="relative flex h-16 items-center justify-between">
                      <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        {/* Mobile menu button*/}
                        <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                          <span className="absolute -inset-0.5" />
                          <span className="sr-only">Open main menu</span>
                          {open ? (
                            <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                          ) : (
                            <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                          )}
                        </Disclosure.Button>
                      </div>
                      <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                        <div className="flex flex-shrink-0 items-center">
                          <img
                            className="h-8 w-auto"
                            src="/company.jpg"
                            alt="Your Company"
                          />
                        </div>
                        <div className="hidden sm:ml-6 sm:block">
                          <div className="flex space-x-4">
                            {navigation.map((item) => (
                              <a
                                key={item.name}
                                href={item.href}
                                className={classNames(
                                  item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                  'rounded-md px-3 py-2 text-sm font-medium'
                                )}
                                aria-current={item.current ? 'page' : undefined}
                              >
                                {item.name}
                              </a>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        <button
                          type="button"
                          className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                        >
                          <span className="absolute -inset-1.5" />
                          <span className="sr-only">View notifications</span>
                          <BellIcon className="h-6 w-6" aria-hidden="true" />
                        </button>

                        {/* Profile dropdown */}
                        <Menu as="div" className="relative ml-3">
                          <div>
                            <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                              <span className="absolute -inset-1.5" />
                              <span className="sr-only">Open user menu</span>
                              <img
                                className="h-8 w-8 rounded-full"
                                src="/dp.jpeg"
                                alt="No IMG"
                              />
                            </Menu.Button>
                          </div>
                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                          >
                            <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                              <Menu.Item>
                                {({ active }) => (
                                  <a
                                    href="#"
                                    className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                  >
                                    Your Profile
                                  </a>
                                )}
                              </Menu.Item>
                              <Menu.Item>
                                {({ active }) => (
                                  <a
                                    href="#"
                                    className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                  >
                                    Settings
                                  </a>
                                )}
                              </Menu.Item>
                              <Menu.Item>
                                {({ active }) => (
                                  <a
                                    href="#"
                                    className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                  >
                                    Sign out
                                  </a>
                                )}
                              </Menu.Item>
                            </Menu.Items>
                          </Transition>
                        </Menu>
                      </div>
                    </div>
                  </div>

                  <Disclosure.Panel className="sm:hidden">
                    <div className="space-y-1 px-2 pb-3 pt-2">
                      {navigation.map((item) => (
                        <Disclosure.Button
                          key={item.name}
                          as="a"
                          href={item.href}
                          className={classNames(
                            item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                            'block rounded-md px-3 py-2 text-base font-medium'
                          )}
                          aria-current={item.current ? 'page' : undefined}
                        >
                          {item.name}
                        </Disclosure.Button>
                      ))}
                    </div>
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          <main
            className={`flex min-h-screen flex-col items-center pt-5 ${inter.className}`}
          >
            <div >
              {data ?
                  <div className="bg-indigo-900 text-center py-4 lg:px-4 rounded-full" >
                    <div className="p-2 bg-indigo-800 items-center text-indigo-100 leading-none lg:rounded-full flex lg:inline-flex" role="alert">
                      <span className="flex rounded-full bg-indigo-500 uppercase px-2 py-1 text-xs font-bold mr-3">New</span>
                      <span className="font-semibold mr-2 text-left flex-auto">{
                      ( data==1? "Person has a heart condition":"Person do not have any chances of heart condition" ) }</span>
                      <svg className="fill-current opacity-75 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z"/></svg>
                    </div>
                </div>
                :""}
            </div>
            <section>
              <form className="w-full max-w-sm">
                <div className="md:flex md:items-center mb-6">
                  <div className="md:w-1/3">
                    <label
                      className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                      htmlFor="inline-full-name"
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
                      
                    >
                      Sex
                    </label>
                  </div>
                  <div className="md:w-2/3">
                    <div className="flex items-center space-x-4">
                      <input
                        type="radio"
                        id="option1"
                        name="radio-group"
                        value="1"
                        className="focus:ring-indigo-500 focus:ring-opacity-50 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                        onChange={handleRadioChange}
                      />
                      <label htmlFor="option1" className="text-sm font-medium text-gray-700">
                        male
                      </label>
                      <input
                        type="radio"
                        id="option2"
                        name="radio-group"
                        value="0"
                        className="focus:ring-indigo-500 focus:ring-opacity-50 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                        onChange={handleRadioChange}
                      />
                      <label htmlFor="option2" className="text-sm font-medium text-gray-700">
                        female
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="md:flex md:items-center mb-6"> 
                  <div className="md:w-1/3">
                    <label htmlFor="age" className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">Age</label>
                  </div>
                  <div className="md:w-2/3">
                    <input type="number" id="age" name="age" min="1" max="90" value= {age}className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                    onChange={(e) => {
                        const inputValue = e.target.value;
                        if (inputValue <= 90) {
                          setAge(inputValue);
                        } else {
                          alert("Age cannot be greater than 90");
                          setAge(90);
                        }
                      }
                    }/>
                  </div>
                </div>
                
                <div className="md:flex md:items-center mb-6">
                  <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="grid-state">
                    Chest Pain Type
                  </label>
                  <div className="relative">
                    <select id="grid-state" className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                    value={chestpaintype}
                    onChange={handleChestPainTypeChange}
                    >
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                    </select>

                    <input type="hidden" id="selected-value"/>

                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg className="fill-current h-4 w-4 ml-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                    </div>
                  </div>
                </div>

                <div className="md:flex md:items-center mb-6"> 
                  <div className="md:w-1/3">
                    <label htmlFor="bp" className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">Resting BP</label>
                  </div>
                  <div className="md:w-2/3">
                    <input type="number" id="bp" name="bp" value={restingbp} 
                    onChange={(e) => SetRestingBP(e.target.value)}
                    min="1" className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"/>
                  </div>
                </div>

                <div className="md:flex md:items-center mb-6"> 
                  <div className="md:w-1/3">
                    <label htmlFor="cholesterol" className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">Cholesterol</label>
                  </div>
                  <div className="md:w-2/3">
                    <input type="number" id="cholesterol" name="cholesterol" value={cholesterol} onChange={(e) => SetCholesterol(e.target.value)} min="1" className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"/>
                  </div>
                </div>

                <div className="md:flex md:items-center mb-6"> 
                  <div className="md:w-1/3">
                    <label htmlFor="blood_sugar" className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">Blood Sugar (g/ml)</label>
                  </div>
                  <div className="md:w-2/3">
                    <input type="number" id="blood_sugar" name="blood_sugar" value={bloodsugar} onChange={(e)=> SetBloodSugar(e.target.value)}
                    min="1" className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"/>
                  </div>
                </div>

                <div className="md:flex md:items-center mb-6"> 
                  <div className="md:w-1/3">
                    <label htmlFor="max_heart_rate" className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">Max Heart Rate</label>
                  </div>
                  <div className="md:w-2/3">
                    <input type="number" id="max_heart_rate" name="max_heart_rate" value={max_heart_rate} 
                    onChange={(e) => Setmax_heart_rate(e.target.value)} 
                    min="1" className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"/>
                  </div>
                </div>

                <div className="md:flex md:items-center">
                  <div className="md:w-1/3"></div>
                  <div className="md:w-2/3">
                    <button
                      className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                      type="button"
                      onClick={(e) => handleSubmit(e)}
                    >
                      Predict
                    </button>
                  </div>
                </div>
              </form>
              
            </section>
          </main>
        </>
      )
    }
    </>          
  );
}
