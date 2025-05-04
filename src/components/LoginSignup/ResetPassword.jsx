import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { baseURL } from '../Cart/Cart'

export const ResetPassword = () => {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [token, setToken] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!password || !confirmPassword) {
      return setError('Please fill all the fields')
    }
    if (password !== confirmPassword) {
      return setError('Passwords do not match')
    }
    try {
      setLoading(true)
      const response = await fetch(`${baseURL}/api/forgot/password-reset/${token}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      })
      const data = await response.json()
      if (data.success) {
        setSuccess(data.message || 'Password changed successfully')
        setPassword('')
        setConfirmPassword('')
      } else {
        setError(data.message || 'Something went wrong, try again!')
      }
    } catch (error) {
      setError('An error occurred. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  const params = new URLSearchParams(window.location.search)
  useEffect(() => {
    const token = params.get('t')
    if (token) {
      setToken(token)
    }
  }, [])

  useEffect(() => {
    if (error || success) {
      const timer = setTimeout(() => {
        setError('')
        setSuccess('')
      }, 4000)
      return () => clearTimeout(timer)
    }
  }, [error, success])

  return (
    <>
      <div className="flex items-center justify-center bg-gray-50 px-4">
        <div className="w-full max-w-lg py-20">
          <h1 className="text-2xl font-bold text-center text-gray-800">Change Password</h1>
          <p className="mt-2 text-center text-sm text-gray-600">
            Enter your new password below to reset your account.
          </p>

          {error && (
            <p className="text-sm text-red-600 mt-2 bg-red-50 p-4 rounded">{error}</p>
          )}
          {success && (
            <p className="text-sm text-green-600 mt-2 bg-green-50 p-4 rounded">{success}</p>
          )}

          <form className="mt-6 flex flex-col gap-5" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                New Password
              </label>
              <input
                id="newPassword"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter new password"
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-200"
            >
              {loading ? 'Changing password...' : 'Change Password'}
            </button>
          </form>

          <div className="mt-4 text-center">
            <a
              href="/login"
              className="text-sm text-blue-600 hover:underline"
            >
              Back to Login
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
