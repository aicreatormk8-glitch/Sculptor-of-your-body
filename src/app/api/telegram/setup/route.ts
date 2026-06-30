import { NextRequest, NextResponse } from 'next/server';

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;

export async function GET(request: NextRequest): Promise<NextResponse> {
  if (!BOT_TOKEN) {
    return NextResponse.json(
      { success: false, message: 'Bot token not configured' },
      { status: 500 }
    );
  }

  try {
    const protocol = request.headers.get('x-forwarded-proto') || 'https';
    const host = request.headers.get('x-forwarded-host') || request.headers.get('host') || 'sculptor-of-your-body.vercel.app';

    const webhookUrl = `${protocol}://${host}/api/telegram`;

    const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/setWebhook`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        url: webhookUrl,
        allowed_updates: ['message', 'callback_query'],
      }),
    });

    const result = await response.json();

    if (result.ok) {
      return NextResponse.json({
        success: true,
        message: `Webhook set to ${webhookUrl}`,
        webhook_url: webhookUrl,
      });
    } else {
      return NextResponse.json(
        {
          success: false,
          message: result.description || 'Failed to set webhook',
        },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Setup error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
