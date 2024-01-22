import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (req, res) => {
    try {
        const prompts = await Prompt.find({}).populate('creator')
        return new Response(JSON.stringify(prompts), { status: 201 })

    } catch (e) {
        console.log(e)
        return new Response('Failed to retrieve prompt data', { status: 500 })
    }
}