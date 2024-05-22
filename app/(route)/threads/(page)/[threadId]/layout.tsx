import { ReactNode, Suspense } from "react";
import ReplyContextProvider from "../../components/ReplyBoxContext/ReplyContextProvider";
import Loading from "@/app/components/layout/Loading";
import ImageModalContextProvider from "../../components/ImageModalContext/ImageModalContextProvider";

export default function ThreadLayout({
	children
}: {
	children: ReactNode
}) {
	return (
		<Suspense fallback={<Loading/>}>
			<ImageModalContextProvider>
				<ReplyContextProvider>
					{children}
				</ReplyContextProvider>
			</ImageModalContextProvider>
		</Suspense>
	)
}