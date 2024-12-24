<?php
/*
Plugin Name: Webiloper Telegram Message Sender
Description: A plugin to send messages to Telegram when a button in the admin panel is clicked.
Version: 1.0
Author: Webiloper
*/

// Add button to admin menu
function tms_add_button() {
    add_menu_page('Telegram Message Sender', 'Send Telegram Message', 'manage_options', 'telegram-message-sender', 'tms_send_message_page');
}
add_action('admin_menu', 'tms_add_button');

function tms_send_message_page() {
    if (isset($_POST['send_message'])) {
        $response = wp_remote_post('YOUR CLOUDFLARE WORKER URL', [
            'body' => json_encode(['message' => 'Your message here']),
            'headers' => [
                'Content-Type' => 'application/json'
            ],
        ]);

        if (is_wp_error($response)) {
            echo '<div class="error"><p>Error sending message.</p></div>';
        } else {
            echo '<div class="updated"><p>Message sent to Telegram!</p></div>';
        }
    }
    ?>
    <div class="wrap">
        <h1>Send Message to Telegram</h1>
        <form method="post" action="">
            <input type="submit" name="send_message" class="button button-primary" value="Send Message">
        </form>
    </div>
    <?php
}
