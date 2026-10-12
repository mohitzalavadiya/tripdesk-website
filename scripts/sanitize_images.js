const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function main() {
  const targetDir = path.join(__dirname, '..', 'public', 'screenshots');
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  const brainDir = 'C:/Users/hp/.gemini/antigravity-ide/brain/1e6f92b6-d51a-496d-bc5d-7338e5c3a817';

  // Clean topbar pill SVG
  const topbarPillSvg = Buffer.from(
    '<svg width="250" height="34">' +
    '<rect width="250" height="34" rx="17" fill="#EEF2F6" stroke="#CBD5E1" stroke-width="1"/>' +
    '<text x="18" y="21" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-size="12" font-weight="600" fill="#1E293B">Your Travel Desk Agency</text>' +
    '<text x="180" y="21" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-size="11" fill="#4F46E5">(Starter)</text>' +
    '</svg>'
  );

  // 1. Dashboard
  const dashSrc = path.join(brainDir, 'dashboard_sanitized_1791786259544.png');
  const dashCustomerSvg = Buffer.from(
    '<svg width="220" height="48">' +
    '<rect width="220" height="48" fill="#F8FAFC"/>' +
    '<text x="0" y="16" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-size="13" font-weight="600" fill="#0F172A">Rahul Sharma</text>' +
    '<text x="0" y="36" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-size="12" fill="#64748B">1 bookings • Verified Client</text>' +
    '</svg>'
  );

  await sharp(dashSrc)
    .composite([
      { input: topbarPillSvg, top: 13, left: 495 },
      { input: dashCustomerSvg, top: 692, left: 1410 }
    ])
    .png({ quality: 90 })
    .toFile(path.join(targetDir, 'dashboard.png'));

  // 2. Trips: Mask phone to non-dialable +91 98*** *****
  const tripsSrc = path.join(brainDir, 'trips_page_1791785780236.png');
  const tripsCustomerSvg = Buffer.from(
    '<svg width="180" height="48">' +
    '<rect width="180" height="48" fill="#FFFFFF"/>' +
    '<text x="0" y="15" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-size="14" font-weight="600" fill="#0F172A">Rahul Sharma</text>' +
    '<text x="0" y="35" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-size="12" fill="#64748B">+91 98*** *****</text>' +
    '</svg>'
  );

  await sharp(tripsSrc)
    .composite([
      { input: topbarPillSvg, top: 13, left: 495 },
      { input: tripsCustomerSvg, top: 505, left: 650 }
    ])
    .png({ quality: 90 })
    .toFile(path.join(targetDir, 'trips.png'));

  // 3. Quotations: Complete Trip & Customer cell overlay with clean typography
  const quotesSrc = path.join(brainDir, 'quotations_page_1791789913900.png');
  const quoteRows = [
    { y: 404, trip: 'Goa 7-Day Tour', customer: 'Rahul Sharma (+91 98*** *****)' },
    { y: 468, trip: 'Manali Mountain Trail', customer: 'Ananya Iyer (+91 98*** *****)' },
    { y: 532, trip: 'Shimla &amp; Kullu Package', customer: 'Vikram Singh (+91 98*** *****)' },
    { y: 596, trip: 'Shimla Manali Deluxe', customer: 'Vikram Singh (+91 98*** *****)' },
    { y: 660, trip: 'Kerala Backwaters Tour', customer: 'Rahul Sharma (+91 98*** *****)' },
    { y: 724, trip: 'Rajasthan Royal Circuit', customer: 'Rahul Sharma (+91 98*** *****)' },
    { y: 788, trip: 'Kerala Munnar Express', customer: 'Priya Verma (+91 98*** *****)' },
    { y: 852, trip: 'Jaipur City &amp; Forts', customer: 'Priya Verma (+91 98*** *****)' },
    { y: 916, trip: 'Golden Triangle Tour', customer: 'Priya Verma (+91 98*** *****)' },
  ];

  const quoteComposites = [
    { input: topbarPillSvg, top: 13, left: 495 }
  ];

  for (const row of quoteRows) {
    const rowSvg = Buffer.from(
      `<svg width="320" height="46">` +
      `<rect width="320" height="46" fill="#FFFFFF"/>` +
      `<text x="0" y="16" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-size="13" font-weight="600" fill="#0F172A">${row.trip}</text>` +
      `<text x="0" y="34" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-size="12" fill="#64748B">${row.customer}</text>` +
      `</svg>`
    );
    quoteComposites.push({ input: rowSvg, top: row.y, left: 672 });
  }

  await sharp(quotesSrc)
    .composite(quoteComposites)
    .extract({ left: 0, top: 0, width: 1920, height: 953 })
    .png({ quality: 90 })
    .toFile(path.join(targetDir, 'quotations.png'));

  // 4. Bookings: Complete Customer & Contact cell overlay with clean typography
  const bookingsSrc = path.join(brainDir, 'bookings_page_1791789930217.png');
  const bookingRows = [
    { y: 414, name: 'Rahul Sharma', contact: '+91 98*** ***** • client.booking@traveler-desk.in' },
    { y: 492, name: 'Ananya Iyer', contact: '+91 98*** ***** • client.booking@traveler-desk.in' },
    { y: 569, name: 'Ananya Iyer', contact: '+91 98*** ***** • client.booking@traveler-desk.in' },
    { y: 647, name: 'Rahul Sharma', contact: '+91 98*** ***** • client.booking@traveler-desk.in' },
    { y: 725, name: 'Rahul Sharma', contact: '+91 98*** ***** • client.booking@traveler-desk.in' },
    { y: 802, name: 'Vikram Singh', contact: '+91 98*** ***** • client.booking@traveler-desk.in' },
  ];

  const bookingComposites = [
    { input: topbarPillSvg, top: 13, left: 495 }
  ];

  for (const row of bookingRows) {
    const rowSvg = Buffer.from(
      `<svg width="360" height="48">` +
      `<rect width="360" height="48" fill="#FFFFFF"/>` +
      `<text x="0" y="15" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-size="14" font-weight="600" fill="#0F172A">${row.name}</text>` +
      `<text x="0" y="34" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-size="12" fill="#64748B">${row.contact}</text>` +
      `</svg>`
    );
    bookingComposites.push({ input: rowSvg, top: row.y, left: 595 });
  }

  await sharp(bookingsSrc)
    .composite(bookingComposites)
    .extract({ left: 0, top: 0, width: 1920, height: 953 })
    .png({ quality: 90 })
    .toFile(path.join(targetDir, 'bookings.png'));

  // 5. Pricing: Crop out the misleading 1/0 meter cards, perfectly centered on clean canvas
  const pricingSrc = path.join(brainDir, 'pricing_plans_sanitized_1791786337481.png');
  const croppedPricingBuffer = await sharp(pricingSrc)
    .extract({ left: 256, top: 375, width: 1664, height: 575 })
    .resize(1500, 518)
    .toBuffer();

  await sharp({
    create: {
      width: 1920,
      height: 953,
      channels: 4,
      background: { r: 244, g: 247, b: 250, alpha: 1 }
    }
  })
    .composite([
      { input: topbarPillSvg, top: 30, left: 495 },
      { input: croppedPricingBuffer, top: 200, left: 210 }
    ])
    .png({ quality: 90 })
    .toFile(path.join(targetDir, 'pricing.png'));

  // Clean up debug files
  const files = fs.readdirSync(targetDir);
  for (const f of files) {
    if (f.startsWith('debug_')) {
      try {
        fs.unlinkSync(path.join(targetDir, f));
      } catch {}
    }
  }

  console.log('All 5 screenshots successfully processed, sanitized, and saved to public/screenshots!');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
