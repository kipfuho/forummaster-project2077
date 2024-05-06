'use client'
import Loading from "@/app/components/layout/Loading";
import { getUserDetailV2 } from "@/app/components/utils/fetch/v2/user";
import { FullUserDocument, UserDocument } from "@/app/page";
import { Box, Divider } from "@mui/material";
import { grey } from "@mui/material/colors";
import { format, getYear, subYears } from "date-fns";
import { useEffect, useState } from "react";

export default function About({value, index, user}: {value: number, index: number, user: UserDocument}) {
	const [detailedUser, setDetailedUser] = useState<FullUserDocument | null>(null);
	const [done, setDone] = useState<boolean>(false);
	
	useEffect(() => {
		if(user) {
			const getDetail = async () => {
				const detailedUser = await getUserDetailV2(user._id);
				setDetailedUser(detailedUser);
				setDone(true);
			}

			getDetail().catch((e) => console.log(e));
		}
	}, [user]);
	
	return (
		<div
			role="tabpanel"
			hidden={value !== index}
		>
			<Box sx={{bgcolor: grey[700], borderRadius: 1}}>
				{done ?
					<>
						{detailedUser ?
							<>
								<div className="p-2">
									<p>
										<span>Birthday: </span>
										<span>
											{detailedUser.setting.date_of_birth ? `${format(detailedUser.setting.date_of_birth, "MMM dd, YYYY")} (Age: ${getYear(new Date()) - getYear(detailedUser.setting.date_of_birth)})` : "Unset"}
										</span>
									</p>
									<p>
										<span>Location: </span>
										<span>{detailedUser.setting.location ? detailedUser.setting.location : "Unset"}</span>
									</p>
								</div>
								<Divider sx={{borderColor: grey[400]}}/>
								<div className="p-2">
									Signature: None
								</div>
								<Divider sx={{borderColor: grey[400]}}/>
								<div className="p-2">
									<span>Followings: </span>
									<span>{detailedUser.followings.length}</span>
								</div>
								<Divider sx={{borderColor: grey[400]}}/>
								<div className="p-2">
									<span>Followers: </span>
									<span>{detailedUser.followers.length}</span>
								</div>
							</> :
							<>Error fetching user</>
						}
					</> :
					<Loading/>
				}
			</Box>
		</div>
	)
}