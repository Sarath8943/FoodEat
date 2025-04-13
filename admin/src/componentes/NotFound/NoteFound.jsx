import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
      <div className="text-center max-w-md md:max-w-lg bg-white p-8 rounded-2xl shadow-xl">
        <div className="flex justify-center">
          <ErrorOutlineIcon 
            sx={{ 
              fontSize: 100,
              color: 'rgb(99, 102, 241)'
            }} 
            className="opacity-90"
          />
        </div>
        
        <h1 className="text-8xl font-black text-indigo-500 mt-4 mb-2">
          404
        </h1>
        
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Page Not Found
        </h2>
        
        <p className="text-lg text-gray-600 mb-8">
          The page you're looking for doesn't exist or has been moved. 
          Let's get you back on track.
        </p>
        
        <div className="flex justify-center gap-4">
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate(-1)}
            className="bg-gray-600 hover:bg-gray-700 px-6 py-3 rounded-full font-medium transition-all"
          >
            Go Back
          </Button>
          
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/home')}
            className="bg-indigo-500 hover:bg-indigo-600 px-6 py-3 rounded-full font-medium transition-all shadow-md"
          >
            Go to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
}

export default NotFound;

