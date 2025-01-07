import React, { Fragment, useState } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';
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
function Columns() {
    const [data,setData] = useState("");
    const BACKEND_URL  = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000' ;
    const [loading, setLoading] = useState(false);
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            // Send the form data to the backend using fetch API
            setLoading(true);
            const response = await fetch(`${BACKEND_URL}/get_data_columns`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            });
            // Handle the response from the backend
            if (response.ok) {
              const dataI = await response.json();
              setData(dataI)
              console.log('Prediction result:', dataI);
              setLoading(false);
            // Do something with the prediction result
            } else {
              setLoading(false);
              console.error('Error:', response.status);
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
        <section >
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
                          className="h-8 w-8 rounded-full"
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
                              alt="No_img"
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
          <div className='flex min-h-screen flex-col items-center p-5'>
              <div>
                  <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full' onClick={(e)=>handleSubmit(e)}>
                      Click Me
                  </button>
              </div>
              <div className="px-4 sm:px-0">
                  <h3 className="text-base font-semibold leading-7 text-gray-900">Applicant Information</h3>
                  <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Personal details and application.</p>
              </div>
              <div>
                {data && data.Data_Columns && (
                  <div className="mt-6">
                    <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Index</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Column Name</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                          {data.Data_Columns.map((columnName, index) => (
                            <tr key={index} className="hover:bg-gray-50 transition-colors duration-200">
                              <td className="px-6 py-4 text-sm text-gray-500">{index + 1}</td>
                              <td className="px-6 py-4">
                                <div className="flex items-center">
                                  <div className="h-2 w-2 rounded-full bg-blue-400 mr-3" />
                                  <span className="text-sm font-medium text-gray-900">{columnName}</span>
                                </div>
                              </td>
                              <td className="px-6 py-4">
                                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                                  View Details
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
                  
              </div>
          </div>
        </section>
      )}
    </>
  )
}

export default Columns