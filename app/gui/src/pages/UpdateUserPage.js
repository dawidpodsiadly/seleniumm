import React, {useEffect, useState} from 'react';
import {useParams, useNavigate, Link} from 'react-router-dom';
import apis from '../api/api';
import {formatDate} from '../utils/date.util';

const contractTypes = {
  employment_contract: 'Employment',
  service_contract: 'Mandate',
  sole_proprietorship: 'B2B',
};

const positionOptions = ['Storekeeper', 'Accountant', 'IT'];

function UpdateUserPage() {
  const {id} = useParams();
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [notes, setNotes] = useState('');
  const [isActivated, setIsActivated] = useState(false);
  const [contractType, setContractType] = useState('');
  const [salary, setSalary] = useState('');
  const [position, setPosition] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState({});
  const [changePassword, setChangePassword] = useState(false);
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userResponse, usersResponse] = await Promise.all([apis.getUserById(id), apis.getAllUsers()]);

        const userData = userResponse.data;
        setUserData(userData);
        setName(userData.name);
        setSurname(userData.surname);
        setEmail(userData.email);
        setPhoneNumber(userData.phoneNumber);
        setBirthDate(formatDate(userData.birthDate));
        setNotes(userData.notes);
        setIsActivated(userData.isActivated);
        setContractType(userData.contract.type);
        setSalary(userData.contract.salary);
        setPosition(userData.contract.position);
        setStartTime(formatDate(userData.contract.startTime));
        setEndTime(formatDate(userData.contract.endTime));
        setIsAdmin(userData.isAdmin);
        setAllUsers(usersResponse.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [id]);

  const validateInputs = () => {
    const newErrors = {};
    const phoneRegex = /^\d{9,14}$/;
    const salaryRegex = /^\d+$/;
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

    if (!name) newErrors.name = 'User Name is required';
    if (!surname) newErrors.surname = 'Surname is required';
    if (!email) newErrors.email = 'Email is required';
    if (changePassword) {
      if (!password) newErrors.password = 'Password is required';
      if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords must match';
      if (password && password.length < 9) newErrors.password = 'Password must be at least 9 characters long';
    }
    if (phoneNumber && !phoneRegex.test(phoneNumber)) {
      newErrors.phoneNumber = 'Your phone number does not exist';
    }
    if (salary && !salaryRegex.test(salary)) {
      newErrors.salary = 'Salary must be a number';
    }
    if (startTime && !dateRegex.test(startTime)) {
      newErrors.startTime = 'Start date must be a valid date (YYYY-MM-DD)';
    }
    if (endTime && !dateRegex.test(endTime)) {
      newErrors.endTime = 'End date must be a valid date (YYYY-MM-DD)';
    }
    if (birthDate && !dateRegex.test(birthDate)) {
      newErrors.birthDate = 'Birth date must be a valid date (YYYY-MM-DD)';
    }
    if (startTime && endTime && new Date(endTime) <= new Date(startTime)) {
      newErrors.endTime = 'End date must be after start date';
    }

    const emailExists = allUsers.some(user => user.email === email && user._id !== id);
    if (emailExists) {
      newErrors.email = 'Email already exists';
    }

    return newErrors;
  };

  const handleSubmit = e => {
    e.preventDefault();

    const newErrors = validateInputs();
    if (Object.keys(newErrors).length > 0) {
      setError(newErrors);
      return;
    }

    const userData = {
      name,
      surname,
      email,
      phoneNumber,
      birthDate,
      notes,
      isActivated,
      isAdmin,
      contract: {
        type: contractType,
        salary,
        position,
        startTime,
        endTime,
      },
    };

    if (changePassword) {
      userData.password = password;
    }

    apis
      .updateUserById(id, userData)
      .then(res => {
        console.log(res);
        navigate('/');
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="d-flex vh-100 bg-white justify-content-center align-items-center border rounded">
      {userData && (
        <div id="update-user-form" className="w-50 bg-white rounded p-3">
          <form onSubmit={handleSubmit}>
            <h1 className="mb-4">Update User</h1>
            <div className="mb-3 row">
              <div className="col">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Enter Name"
                  className="form-control"
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
                {error.name && <p className="text-danger">{error.name}</p>}
              </div>
              <div className="col">
                <label htmlFor="surname" className="form-label">
                  Surname
                </label>
                <input
                  id="surname"
                  type="text"
                  placeholder="Enter Surname"
                  className="form-control"
                  value={surname}
                  onChange={e => setSurname(e.target.value)}
                />
                {error.surname && <p className="text-danger">{error.surname}</p>}
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter Email"
                className="form-control"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
              {error.email && <p className="text-danger">{error.email}</p>}
            </div>
            <div className="mb-3 row">
              <div className="col-auto align-self-end">
                <div className="form-check">
                  <input
                    id="changePassword"
                    type="checkbox"
                    className="form-check-input"
                    checked={changePassword}
                    onChange={e => setChangePassword(e.target.checked)}
                  />
                  <label htmlFor="changePassword" className="form-check-label">
                    Change Password
                  </label>
                </div>
              </div>
              <div className="col">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="Enter Password"
                  className={`form-control ${changePassword ? '' : 'disabled'}`}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  disabled={!changePassword}
                />
                {error.password && <p className="text-danger">{error.password}</p>}
              </div>
              <div className="col">
                <label htmlFor="confirmPassword" className="form-label">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm Password"
                  className={`form-control ${changePassword ? '' : 'disabled'}`}
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  disabled={!changePassword}
                />
                {error.confirmPassword && <p className="text-danger">{error.confirmPassword}</p>}
              </div>
            </div>
            <div className="mb-3 row">
              <div className="col">
                <label htmlFor="phoneNumber" className="form-label">
                  Phone Number
                </label>
                <input
                  id="phoneNumber"
                  type="text"
                  placeholder="Enter Phone Number"
                  className="form-control"
                  value={phoneNumber}
                  onChange={e => setPhoneNumber(e.target.value)}
                />
                {error.phoneNumber && <p className="text-danger">{error.phoneNumber}</p>}
              </div>
              <div className="col">
                <label htmlFor="birthDate" className="form-label">
                  Birth Date
                </label>
                <input
                  id="birthDate"
                  type="date"
                  className="form-control"
                  value={birthDate}
                  onChange={e => setBirthDate(e.target.value)}
                />
                {error.birthDate && <p className="text-danger">{error.birthDate}</p>}
              </div>
            </div>
            <div className="mb-3 row">
              <div className="col">
                <label htmlFor="contractType" className="form-label">
                  Contract Type
                </label>
                <select
                  id="contractType"
                  className="form-select"
                  value={contractType}
                  onChange={e => setContractType(e.target.value)}
                >
                  <option value="">Select Contract Type</option>
                  {Object.entries(contractTypes).map(([key, value]) => (
                    <option key={key} value={value}>
                      {value}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col">
                <label htmlFor="salary" className="form-label">
                  Salary
                </label>
                <input
                  id="salary"
                  type="text"
                  placeholder="Enter Salary"
                  className="form-control"
                  value={salary}
                  onChange={e => setSalary(e.target.value)}
                />
                {error.salary && <p className="text-danger">{error.salary}</p>}
              </div>
              <div className="col">
                <label htmlFor="position" className="form-label">
                  Position
                </label>
                <select
                  id="position"
                  className="form-select"
                  value={position}
                  onChange={e => setPosition(e.target.value)}
                >
                  <option value="">Select Position</option>
                  {positionOptions.map(pos => (
                    <option key={pos} value={pos}>
                      {pos}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="mb-3 row">
              <div className="col">
                <label htmlFor="startTime" className="form-label">
                  Start Time
                </label>
                <input
                  id="startTime"
                  type="date"
                  className="form-control"
                  value={startTime}
                  onChange={e => setStartTime(e.target.value)}
                />
                {error.startTime && <p className="text-danger">{error.startTime}</p>}
              </div>
              <div className="col">
                <label htmlFor="endTime" className="form-label">
                  End Time
                </label>
                <input
                  id="endTime"
                  type="date"
                  className="form-control"
                  value={endTime}
                  onChange={e => setEndTime(e.target.value)}
                />
                {error.endTime && <p className="text-danger">{error.endTime}</p>}
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="notes" className="form-label">
                Notes
              </label>
              <textarea
                id="notes"
                placeholder="Enter Notes"
                className="form-control"
                value={notes}
                onChange={e => setNotes(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <div className="form-check form-check-inline">
                <input
                  id="isActivated"
                  type="checkbox"
                  className="form-check-input"
                  checked={isActivated}
                  onChange={e => setIsActivated(e.target.checked)}
                />
                <label htmlFor="isActivated" className="form-check-label">
                  Is Activated
                </label>
              </div>
              <div style={{width: '10px', display: 'inline-block'}}></div>
              <div className="form-check form-check-inline">
                <input
                  id="isAdmin"
                  type="checkbox"
                  className="form-check-input"
                  checked={isAdmin}
                  onChange={e => setIsAdmin(e.target.checked)}
                />
                <label htmlFor="isAdmin" className="form-check-label">
                  Is Admin
                </label>
              </div>
            </div>

            <div className="mb-3">
              <button id="submit-button" type="submit" className="btn btn-primary">
                Submit
              </button>
              <Link id="cancel-button" to="/" className="btn btn-secondary ms-2">
                Cancel
              </Link>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default UpdateUserPage;
