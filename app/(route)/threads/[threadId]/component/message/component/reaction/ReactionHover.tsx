'use client'
import Loading from "@/app/components/layout/Loading";
import { reactMessageV2 } from "@/app/components/utils/fetch/v2/message";
import { MessageDocument, ReactionDocument } from "@/app/page";
import { IconButton, Tooltip } from "@mui/material";
import { Dispatch, SetStateAction, Suspense } from "react";

export default function ReactionHover({messageId, userId, setMessage, setReaction, setOpenReactionBox}: {messageId: string, userId: string, setMessage: Dispatch<SetStateAction<MessageDocument>>, setReaction: Dispatch<SetStateAction<ReactionDocument | null>>, setOpenReactionBox: Dispatch<SetStateAction<boolean>>}) {
	return (
		<Suspense fallback={<Loading/>}>
			<Tooltip title='Like'>
				<IconButton
					onClick={async () => {
						const result: {message: MessageDocument, reaction: ReactionDocument} = await reactMessageV2(messageId, userId);
						if(result) {
							setMessage(result.message);
							setReaction(result.reaction);
						}
						setOpenReactionBox(false);
					}}
				>👍</IconButton>
			</Tooltip>
			<Tooltip title='Love'>
				<IconButton
					onClick={async () => {
						const result: {message: MessageDocument, reaction: ReactionDocument} = await reactMessageV2(messageId, userId, 'love');
						if(result) {
							setMessage(result.message);
							setReaction(result.reaction);
						}
						setOpenReactionBox(false);
					}}
				>❤️</IconButton>
			</Tooltip>
			<Tooltip title='Care'>
				<IconButton
					onClick={async () => {
						const result: {message: MessageDocument, reaction: ReactionDocument} = await reactMessageV2(messageId, userId, 'care');
						if(result) {
							setMessage(result.message);
							setReaction(result.reaction);
						}
						setOpenReactionBox(false);
					}}
				>🥰</IconButton>
			</Tooltip>
			<Tooltip title='Haha'>
				<IconButton
					onClick={async () => {
						const result: {message: MessageDocument, reaction: ReactionDocument} = await reactMessageV2(messageId, userId, 'haha');
						if(result) {
							setMessage(result.message);
							setReaction(result.reaction);
						}
						setOpenReactionBox(false);
					}}
				>😂</IconButton>
			</Tooltip>
			<Tooltip title='Wow'>
				<IconButton
					onClick={async () => {
						const result: {message: MessageDocument, reaction: ReactionDocument} = await reactMessageV2(messageId, userId, 'wow');
						if(result) {
							setMessage(result.message);
							setReaction(result.reaction);
						}
						setOpenReactionBox(false);
					}}
				>😯</IconButton>
			</Tooltip>
			<Tooltip title='Sad'>
				<IconButton
					onClick={async () => {
						const result: {message: MessageDocument, reaction: ReactionDocument} = await reactMessageV2(messageId, userId, 'sad');
						if(result) {
							setMessage(result.message);
							setReaction(result.reaction);
						}
						setOpenReactionBox(false);
					}}
				>😢</IconButton>
			</Tooltip>
			<Tooltip title='Angry'>
				<IconButton
					onClick={async () => {
						const result: {message: MessageDocument, reaction: ReactionDocument} = await reactMessageV2(messageId, userId, 'angry');
						if(result) {
							setMessage(result.message);
							setReaction(result.reaction);
						}
						setOpenReactionBox(false);
					}}
				>😡</IconButton>
			</Tooltip>
		</Suspense>
	)
}