import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

// get 
export const GET = async (req, { params }) => {
    try {
        const prompt = await Prompt.findById(params.id).populate('creator')
        if (!prompt) return new Response('Cannot find this prompt', { status: 404 })
        return new Response(JSON.stringify(prompt), { status: 201 })

    } catch (e) {
        console.log(e)
        return new Response('Failed to retrieve prompt data', { status: 500 })
    }
}
// delete
export const DELETE = async (req, { params }) => {
    try {
        await Prompt.findByIdAndDelete(params.id)
        return new Response("Prompt deleted successfully", { status: 200 });
    } catch (e) {
        console.log(e)
        return new Response('Failed to delete prompt', { status: 500 })
    }
}

// patch
export const PATCH = async (request, { params }) => {
    const { prompt, tag } = await request.json();

    try {
        await connectToDB();

        // Find the existing prompt by ID
        const existingPrompt = await Prompt.findById(params.id);

        if (!existingPrompt) {
            return new Response("Prompt not found", { status: 404 });
        }

        // Update the prompt with new data
        existingPrompt.prompt = prompt;
        existingPrompt.tag = tag;

        await existingPrompt.save();

        return new Response("Successfully updated the Prompts", { status: 200 });
    } catch (error) {
        return new Response("Error Updating Prompt", { status: 500 });
    }
};