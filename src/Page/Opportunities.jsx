import React, { useState, useEffect } from 'react';
import { Search, Menu, X } from 'lucide-react';

const Opportunities = () => {
  //this will be fetched from db this is for mocking data
  const jobs = [
    {
      type: 'Hybrid & Onsite Jobs',
      location: 'India',
      title: 'Junior Software Engineer',
      skillreq: 'Intern',
      deadlines: 'Strict',
      industry: 'Startup',
    },
    {
      type: 'Remote Jobs',
      location: 'New York',
      title: 'Data Scientist',
      skillreq: '3+ YOE',
      deadlines: 'Flexible',
      industry: 'Government',
    },
    {
      type: 'Internships',
      location: 'Los Angeles',
      title: 'Marketing Intern',
      skillreq: 'Intern',
      deadlines: 'Flexible',
      industry: 'Non-profit',
    },
    {
      type: 'Freelance Work',
      location: 'Remote',
      title: 'Web Developer',
      skillreq: 'Experienced',
      deadlines: 'Strict',
      industry: 'Big Tech',
    },
    {
      type: 'Hackathons',
      location: 'Chicago',
      title: 'AI Innovators Hackathon Participant',
      skillreq: '3+ YOE',
      deadlines: 'Flexible',
      industry: 'Tech Events',
    },
    {
      type: 'Remote Jobs',
      location: 'San Francisco',
      title: 'Senior Backend Engineer',
      skillreq: '5+ YOE',
      deadlines: 'Strict',
      industry: 'Startup',
    },
    {
      type: 'Hybrid & Onsite Jobs',
      location: 'Berlin',
      title: 'Product Manager',
      skillreq: 'Mid-Level',
      deadlines: 'Strict',
      industry: 'Healthcare',
    },
    {
      type: 'Bootcamps and Courses',
      location: 'London',
      title: 'Full-Stack Developer Bootcamp Instructor',
      skillreq: 'Experienced',
      deadlines: 'Flexible',
      industry: 'Education',
    },
    {
      type: 'Certifications',
      location: 'Remote',
      title: 'AWS Certified Developer Training',
      skillreq: '3+ YOE',
      deadlines: 'Flexible',
      industry: 'Big Tech',
    },
    {
      type: 'Freelance Work',
      location: 'Tokyo',
      title: 'Mobile App Developer',
      skillreq: '5+ YOE',
      deadlines: 'Strict',
      industry: 'Entertainment',
    },
  ];

  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(''); //here option means dataMap options
  const [selectedOpp, setSelectedOpp] = useState(''); //here Opp means selected opportunity or job
  const [filteredJobs, setFilteredJobs] = useState(jobs);
  const [showModal, setShowModal] = useState(false);

  //this will also fetched from db , only for mocking data
  const dataMap = {
    location: ['India', 'New York', 'Los Angeles', 'Chicago', 'San Francisco'],
    industry: ['Startup', 'Big Tech', 'Government', 'Non-profit'],
    skillreq: ['Intern', 'Experienced', '3+ YOE'],
    deadlines: ['Strict', 'Flexible'],
  };

  // Function to handle filter changes
  const handleChange = (e) => {
    const value = e.target.value;
    setSelectedOption(value);

    // Show modal if a valid option is selected
    if (dataMap[value]) {
      setShowModal(true);
    } else {
      setShowModal(false);
    }
  };

  // Function to apply the filter
  const applyFilter = (jobs, filterOption, selectedValue) => {
    if (!selectedValue) return jobs;
    return jobs.filter((job) => {
      // Apply filter based on the selected filter option
      if (
        filterOption === 'location' ||
        filterOption === 'industry' ||
        filterOption === 'skillreq' ||
        filterOption === 'deadlines'
      ) {
        return job[filterOption]?.toLowerCase() === selectedValue.toLowerCase();
      } else if (filterOption === 'type') {
        return job.type.toLowerCase() === selectedValue.toLowerCase();
      }
      return true;
    });
  };

  // Update filtered jobs based on selected filter option and selected value
  useEffect(() => {
    let newFilteredJobs = [...jobs];

    if (selectedOption && selectedOpp) {
      // Apply the filter based on selected option and selected value
      newFilteredJobs = applyFilter(newFilteredJobs, selectedOption, selectedOpp);
    }

    // Also apply filter for job type
    if (selectedOpp && selectedOption === '') {
      newFilteredJobs = applyFilter(newFilteredJobs, 'type', selectedOpp);
    }

    setFilteredJobs(newFilteredJobs);
  }, [selectedOption, selectedOpp]);

  return (
    <>
      {/* Navbar */}
      <nav className="flex w-screen flex-col justify-between border-b-2 border-purple-400 bg-blue-500 text-white shadow-lg md:flex-row">
        {/* Logo and Hamburger Menu */}
        <div className="flex w-full items-center justify-between px-4 py-3">
          {/* Logo */}
          <div className="flex items-center gap-2 text-xl font-bold">
            <img src="./DevDisplay ICON.png" alt="DevDisplay" className="h-12 w-12 rounded-full shadow-md" />
            <span className="tracking-wider text-white">DevDisplay</span>
          </div>

          {/* Hamburger Menu for Mobile */}
          <button className="text-white focus:outline-none md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Navbar Links and Search */}
        <div
          className={`absolute left-0 top-0 w-full bg-blue-500 transition-transform duration-300 ease-in-out md:static md:flex md:items-center md:gap-4 ${
            menuOpen ? 'top-14 translate-y-0 transform' : '-translate-y-full transform'
          } py-6 md:top-auto md:translate-y-0 md:transform-none md:py-0`}
        >
          <div className="flex flex-col items-center gap-4 px-4 md:flex-row">
            {/* Select Dropdown for Opportunities */}
            <select
              className="w-full rounded-md bg-white p-2 text-blue-600 shadow-md transition duration-200 hover:bg-blue-100 focus:outline-none md:mx-2 md:w-auto"
              value={selectedOpp}
              onChange={(e) => setSelectedOpp(e.target.value)} // Update selectedOpp directly
            >
              <option value="">Select type</option>
              <option value="Hybrid & Onsite Jobs">Hybrid & Onsite Jobs</option>
              <option value="Remote Jobs">Remote Jobs</option>
              <option value="Internships">Internships</option>
              <option value="Freelance Work">Freelance Work</option>
              <option value="Hackathons">Hackathons</option>
              <option value="Open-Source Projects">Open-Source Projects</option>
              <option value="Tech events and Devfests">Tech events and Devfests</option>
              <option value="Bootcamps and courses">Bootcamps and courses</option>
              <option value="Certifications">Certifications</option>
            </select>

            {/* Select Dropdown for Filters */}
            <select
              className="w-full rounded-md bg-white p-2 text-blue-600 shadow-md transition duration-200 hover:bg-blue-100 focus:outline-none md:mx-2 md:w-auto"
              value={selectedOption}
              onChange={handleChange}
            >
              <option value="">Select Filter</option>
              <option value="location">Location</option>
              <option value="industry">Industry</option>
              <option value="skillreq">Skill Requirements</option>
              <option value="deadlines">Deadlines</option>
            </select>

            {/* Search Bar */}
            <div className="relative w-full rounded-md border-2 md:mx-2 md:w-72">
              <input
                type="text"
                placeholder="Search opportunities..."
                className="w-full rounded-l-md bg-slate-100 p-2 text-gray-800 shadow-inner transition duration-200 focus:outline-none focus:ring focus:ring-blue-300"
              />
              <button className="absolute right-0 top-0 h-full rounded-r-md border-2 bg-blue-500 p-2 text-white transition duration-200 hover:bg-blue-600">
                <Search />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Modal */}
      <div
        className={`modal fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300 ${
          showModal ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        <div
          className={`modal-content transform rounded-lg border-2 border-purple-400 bg-white p-6 shadow-lg transition-transform duration-300 ease-in-out ${
            showModal ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
          }`}
        >
          <h3 className="text-xl font-semibold">
            {selectedOption === 'location' && 'Select a Location'}
            {selectedOption === 'industry' && 'Select an Industry'}
            {selectedOption === 'skillreq' && 'Select Skill Requirements'}
            {selectedOption === 'deadlines' && 'Select Deadlines'}
          </h3>

          <div className="flex flex-col items-center justify-center">
            <ul className="mt-4">
              {dataMap[selectedOption]?.map((item, index) => (
                <li
                  key={index}
                  onClick={() => {
                    setSelectedOpp(item); // Update selectedOpp
                    setShowModal(false); // Close modal when a selection is made
                  }}
                  className="cursor-pointer py-2 hover:text-blue-600"
                >
                  {item}
                </li>
              ))}
            </ul>
            <button
              onClick={() => setShowModal(false)}
              className="mt-4 rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600"
            >
              Close
            </button>
          </div>
        </div>
      </div>
      <div className="h-11"></div>
      {/* Job Listings */}
      <div className="flex h-screen w-full flex-col items-center overflow-y-scroll border-t-2 border-purple-400 bg-gradient-to-t from-blue-300 to-blue-500 py-4">
        {filteredJobs.length > 0 ? (
          <div className="grid w-11/12 grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredJobs.map((job, index) => (
              <div key={index} className="rounded-lg bg-white p-4 shadow-lg transition duration-300 hover:shadow-xl">
                <h3 className="text-lg font-bold text-blue-600">{job.title}</h3>
                <p className="text-sm text-gray-700">
                  <strong>Type:</strong> {job.type}
                </p>
                <p className="text-sm text-gray-700">
                  <strong>Location:</strong> {job.location}
                </p>
                <p className="text-sm text-gray-700">
                  <strong>Industry:</strong> {job.industry}
                </p>
                <p className="text-sm text-gray-700">
                  <strong>Skill Required:</strong> {job.skillreq}
                </p>
                <p className="text-sm text-gray-700">
                  <strong>Deadline:</strong> {job.deadlines}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-white">No jobs available for this filter.</p>
        )}
      </div>
    </>
  );
};

export default Opportunities;
