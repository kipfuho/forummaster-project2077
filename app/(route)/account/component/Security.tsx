import SaveIcon from '@mui/icons-material/Save';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import { useState } from 'react';

export default function Security() {
	const [existingPasswordSwitch, setExistingPasswordSwitch] = useState(false);
  const [newPasswordSwitch, setNewPasswordSwitch] = useState(false);
  const [confirmNewPasswordSwitch, setConfirmNewPasswordSwitch] = useState(false);
	return(
		<div className="ml-10 w-full">
			<h2>Password and Security</h2>
			<div className="rounded bg-gray-700 w-full">
				<table className='w-full'>
					<tbody>
						<tr>
							<td className='px-2 py-3 text-right border-r-[1px] w-[45%]'>Two-step verification:</td>
							<td className='px-2 py-3'>Disabled</td>
						</tr>
						<tr>
							<td className='px-2 py-3 text-right border-r-[1px]'>Your existing password:</td>
							<td className='px-2 py-3'>
								<div className='flex'>
									<input
										type={existingPasswordSwitch ? 'text' : 'password'}
										className='border bg-gray-900 p-1 focus:outline-none'
									/>
									<div 
										className='flex border bg-gray-800 px-2'
										onClick={() => setExistingPasswordSwitch((prev) => !prev)}
									>
										{existingPasswordSwitch ? 
											<div className='flex justify-center items-center'>
												<ToggleOffIcon/>
												<span className='w-[40px]'>Hide</span>
											</div>:
											<div className='flex justify-center items-center'>
												<ToggleOnIcon/>
												<span className='w-[40px]'>Show</span>
											</div>
										}
									</div>
								</div>
							</td>
						</tr>
						<tr>
							<td className='px-2 py-3 text-right border-r-[1px]'>New password:</td>
							<td className='px-2 py-3'>
								<div className='flex'>
									<input
										type={newPasswordSwitch ? 'text' : 'password'}
										className='border bg-gray-900 p-1 focus:outline-none'
									/>
									<div
										className='flex border bg-gray-800 px-2'
										onClick={() => setNewPasswordSwitch((prev) => !prev)}
									>
										{newPasswordSwitch ? 
											<div className='flex justify-center items-center'>
												<ToggleOffIcon/>
												<span className='w-[40px]'>Hide</span>
											</div>:
											<div className='flex justify-center items-center'>
												<ToggleOnIcon/>
												<span className='w-[40px]'>Show</span>
											</div>
										}
									</div>
								</div>
							</td>
						</tr>
						<tr>
							<td className='px-2 py-3 text-right border-r-[1px]'>Confirm new password:</td>
							<td className='px-2 py-3'>
								<div className='flex'>
									<input
										type={confirmNewPasswordSwitch ? 'text' : 'password'}
										className='border bg-gray-900 p-1 focus:outline-none'
									/>
									<div
										className='flex border bg-gray-800 px-2'
										onClick={() => setConfirmNewPasswordSwitch((prev) => !prev)}
									>
										{confirmNewPasswordSwitch ? 
											<div className='flex justify-center items-center'>
												<ToggleOffIcon/>
												<span className='w-[40px]'>Hide</span>
											</div>:
											<div className='flex justify-center items-center'>
												<ToggleOnIcon/>
												<span className='w-[40px]'>Show</span>
											</div>
										}
									</div>
								</div>
							</td>
						</tr>
					</tbody>
				</table>
				<div className='flex justify-center p-2 border-t-[1px]'>
					<button className='flex rounded bg-red-700 px-4 py-1 gap-1'>
						<SaveIcon/>
						<span>Save</span>
					</button>
				</div>
			</div>
		</div>
	)
}