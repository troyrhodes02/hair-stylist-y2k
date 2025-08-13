import { NextResponse } from 'next/server';
import { env } from '@/lib/server/env';
import {
  getBookingFieldMap,
  BookingFieldMap,
} from '@/lib/server/airtableFieldMap';
import Airtable from 'airtable';

export async function GET() {
  const fieldMap = await getBookingFieldMap(); // Get fieldMap first

  const response: {
    tableId: string;
    recordCount?: number;
    sampleFieldNames?: string[];
    usingOverrides: boolean;
    fieldMap: BookingFieldMap; // Now it matches
    error?: string;
  } = {
    tableId: env.AIRTABLE_BOOKING_TABLE_ID,
    usingOverrides: false,
    fieldMap, // Initialize with the correct data
  };

  try {
    const base = new Airtable({ apiKey: env.AIRTABLE_ACCESS_TOKEN }).base(
      env.AIRTABLE_BASE_ID
    );
    const table = base(env.AIRTABLE_BOOKING_TABLE_ID);

    const records = await table
      .select({ maxRecords: 1, view: 'Grid view' })
      .firstPage();
    response.recordCount = records.length;
    if (records.length > 0) {
      response.sampleFieldNames = Object.keys(records[0].fields);
    }

    if (
      env.BOOKING_DATE_FIELD &&
      env.BOOKING_STATUS_FIELD &&
      env.BOOKING_START_TIME_FIELD
    ) {
      response.usingOverrides = true;
    }

    // The fieldMap is already in the response object, so this line is no longer needed
    // response.fieldMap = await getBookingFieldMap();

    return NextResponse.json(response);
  } catch (error) {
    response.error = error instanceof Error ? error.message : String(error);
    return NextResponse.json(response, { status: 500 });
  }
}
