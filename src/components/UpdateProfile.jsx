import React, {useEffect} from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from "../../config";
import { adminState } from './../store/admin';

function UpdateProfile(){
  const token = localStorage.getItem("token");
  const Navigate = useNavigate();
  if (!token) {
      return <Navigate to="/" />;
  }

  const naviage = useNavigate();
  const adminData = useRecoilValue(adminState);
  const setAdminData = useSetRecoilState(adminState);

  const handleSave = async () => {
      try {
          const response = await fetch(`${BASE_URL}/admin/profile`, {
              method: 'PUT',
              headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${localStorage.getItem('token')}`,
              },
              body: JSON.stringify(adminData),
          });
          const data = await response.json();
          console.log('response from the server');
          console.log(data.user);
          naviage('/profile');
      } catch (error) {
          console.log(error);
      }
  }
  console.log(adminData);

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
    <h1 className="text-2xl font-semibold mb-4">Update Profile</h1>
    <label htmlFor="username" className="block mb-1">Username</label>
    <input
        type="text"
        id="username"
        name="username"
        value={adminData.username}
        onChange={e => setAdminData({ ...adminData, username: e.target.value })}
        className="w-full py-2 px-3 mb-4 border rounded-lg outline-none"
    />

    <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded cursor-pointer w-full"
        onClick={handleSave}
    >
        Save
    </button>
</div>

  );
};
export default UpdateProfile;
