import { NextRequest, NextResponse } from "next/server";
import strapi from "@/app/api/_libs/strapi";
import { Contact, StrapiResponseData } from "@/types/strapi";
import validator from 'validator';

export async function POST(req: NextRequest): Promise<NextResponse> {
  const _contact = await req.json() as { [key:string]: any };

  if(
    validator.isEmpty(_contact.firstName || '')
    || validator.isEmpty(_contact.familyName || '')
    || !validator.isEmail(_contact.email || '')
    || validator.isEmpty(_contact.body || '')
  ) {
    return NextResponse.json({}, { status: 400 });
  }

  const contact = _contact as Contact;

  return await strapi
    .create<StrapiResponseData<Contact>>(
      'contacts',
      contact
    )
    .then(() => {
      return NextResponse.json({});
    })
    .catch(err => {
      console.error(err);
      return NextResponse.json({}, { status: 500 });
    });
}
