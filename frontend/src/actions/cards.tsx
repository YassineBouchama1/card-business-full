import fetchServer from "@/lib/fetch-server";

export const cardsAction = async () => {
    interface CardData {
        id: number;
        name: string;
        contact: string;
        company: string;
        title: string;
        created_at: string;
    }


    try {
        const cards = await fetchServer({
            url: process.env.NEXT_PUBLIC_BACKEND_API_URL + "/cards",
        });

        if (!cards.ok) {
            throw cards;
        }
        const tableData = await cards.json();
        return {
            success: tableData,
        };


    } catch (error: any) {
        // Error caught during execution
        if (error.status) {
            const responseBody = await error.text();
            const errorObject: any = JSON.parse(responseBody);
            return {
                error: errorObject,
            };
            // if there is no error comes from server 
        } else {
            return {
                error: "Error on server.",
            };
        }

    }
}
