import type { RequestHandler } from './$types';
import Joi from 'joi';
import { error as err, json } from '@sveltejs/kit';
import { prisma } from '$helpers/prisma';

const schema = Joi.object({
	email: Joi.string().email().required(),
	newsletter: Joi.boolean().required(),
	waitlist: Joi.boolean().required(),
	policy: Joi.boolean().allow(true).required()
});

interface IBody {
	email: string;
	newsletter: boolean;
	waitlist: boolean;
	policy: boolean;
}

export const POST: RequestHandler = async ({ request }) => {
	let body: IBody = JSON.parse((await request.body?.getReader().read())?.value?.toString() || '');

	// Validate
	const { error } = schema.validate(body);

	if (error) {
		throw err(400, 'Please check your arguments.');
	}

	try {
		const result = await prisma.user.create({
			data: {
				email: body.email,
				newsletter: body.newsletter,
				waitlist: body.waitlist
			}
		});

		return json(result);
	} catch (e) {
		console.log(e);
		throw err(500, 'error');
	}
};
