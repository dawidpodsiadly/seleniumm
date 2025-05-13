import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {dateTimeFormat} from '../utils/date.util';

function UserTableRow({user, handleDelete, onCheckboxChange, isChecked, id, handleToggleActivation, index}) {
  const [isDeleteHovered, setIsDeleteHovered] = useState(false);
  const [isActivationHovered, setIsActivationHovered] = useState(false);

  const statusColor = user.isActivated ? 'text-success' : 'text-danger';
  const statusDot = user.isActivated ? '●' : '●';

  const rowStyle = {
    backgroundColor: index % 2 === 0 ? '#ffffff' : '#f5f5f5',
  };

  const handleCheckboxClick = () => {
    onCheckboxChange(user._id);
  };

  return (
    <tr id={id} style={rowStyle}>
      <td id="user-row-checkbox" className="text-center">
        <input type="checkbox" onChange={handleCheckboxClick} checked={isChecked} />
      </td>
      <td id="user-row-status" className="text-center">
        <span className={statusColor}>{statusDot}</span>
      </td>
      <td id="user-name-and-surname" className="text-center" style={{maxWidth: '150px'}}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
          }}
        >
          <Link
            to={`/userDetails/${user._id}`}
            className={`text-decoration-underline ${user.isActivated ? 'text-success' : 'text-danger'}`}
            style={{
              display: 'block',
              width: '100%',
              height: '100%',
              textAlign: 'center',
            }}
          >
            {user.name} {user.surname}
          </Link>
        </div>
      </td>
      <td id="user-row-email" className="text-center">
        {user.email}
      </td>
      <td id="user-row-phone-number" className="text-center">
        {user.phoneNumber}
      </td>
      <td id="user-row-contract-type" className="text-center">
        {user.contract?.type}
      </td>
      <td id="user-row-start-time" className="text-center">
        {user.contract?.startTime ? dateTimeFormat(user.contract.startTime) : ''}
      </td>
      <td id="user-row-end-time" className="text-center">
        {user.contract?.endTime ? dateTimeFormat(user.contract.endTime) : ''}
      </td>
      <td id="user-row-position" className="text-center">
        {user.contract?.position}
      </td>
      <td id="user-row-last-updated" className="text-center">
        {user.lastUpdated}
      </td>
      <td id="user-row-actions" className="text-left">
        <Link to={`/edit/${user._id}`} id={`${id}-update-button`} className="btn btn-sm btn-success me-2">
          Update
        </Link>
        <button
          id={`${id}-delete-button`}
          onMouseEnter={() => setIsDeleteHovered(true)}
          onMouseLeave={() => setIsDeleteHovered(false)}
          onClick={() => handleDelete(user._id)}
          className={`btn btn-sm btn-danger me-2 ${isDeleteHovered ? 'bg-danger border-danger' : ''}`}
        >
          Delete
        </button>
        <button
          id={`${id}-deactivate-button`}
          onMouseEnter={() => setIsActivationHovered(true)}
          onMouseLeave={() => setIsActivationHovered(false)}
          onClick={() => handleToggleActivation(user._id, !user.isActivated)}
          className={`btn btn-sm btn-primary btn-dark ${isActivationHovered ? (user.isActivated ? 'bg-danger border-danger' : 'bg-success border-success') : ''}`}
        >
          {user.isActivated ? 'Deactivate' : 'Activate'}
        </button>
      </td>
    </tr>
  );
}

function UserTable({users, handleDelete, onCheckboxChange, handleToggleActivation, selectedUsers}) {
  return (
    <table id="users-table" className="table flex-grow-1">
      <thead>
        <tr>
          <th></th>
          <th className="text-center">User Status</th>
          <th className="text-center">Name</th>
          <th className="text-center">Email</th>
          <th className="text-center">Phone Number</th>
          <th className="text-center">Contract Type</th>
          <th className="text-center">Start Time</th>
          <th className="text-center">End Time</th>
          <th className="text-center">Position</th>
          <th className="text-center">Last Updated</th>
          <th className="text-center">Action</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user, index) => (
          <UserTableRow
            key={user._id}
            id={`table-user-row`}
            user={user}
            handleDelete={handleDelete}
            onCheckboxChange={onCheckboxChange}
            isChecked={selectedUsers.includes(user._id)}
            handleToggleActivation={handleToggleActivation}
            index={index}
          />
        ))}
      </tbody>
    </table>
  );
}

export default UserTable;
