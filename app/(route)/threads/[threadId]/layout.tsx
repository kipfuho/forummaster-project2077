import { ReactNode, Suspense } from "react";
import ReplyContextProvider from "./component/ReplyBoxContext/ReplyContextProvider";
import Loading from "@/app/components/layout/Loading";
import ImageModalContextProvider from "./component/ImageModalContext/ImageModalContextProvider";

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