# Inuit-India-The-Atelier
A luxury retail experience for Inuit India. This repository features a bespoke JavaScript-powered chatbot (Arjun - Lead Host) designed to guide customers through hand-lasted footwear collections, sizing guides, and the artisan shoemaking process.

This project features a custom-built, lightweight JavaScript Chatbot Engine designed for a luxury retail experience. It focuses on high-performance state management and interactive media control.

# Core Functionality
- Keyword-Driven State Machine: The bot uses a custom "State Router" to process user intent. It identifies keywords (e.g., "Wedding," "Sizing," "Making") and updates the chatState to deliver context-specific responses.

- Smart Fallback System: Built-in error handling prevents conversation dead-ends. If a user's message is unrecognized, the bot triggers a fallback state that provides helpful navigation buttons to steer the user back on track.

- Refresh Logic: A manual reset function that clears the chat history and restarts the bot from the welcome state without a full page reload.

# Advanced Media Features
- Programmatic Video Control: Integrated custom JavaScript controls for play/pause functionality using the HTML5 Video API.

- Timelapse Feature: Includes a toggle for playbackRate, allowing users to watch long artisan craft processes at 2.0x speed.

- Preservation of Detail: Uses object-fit: contain within dynamic "Cinema Cards" to ensure craft videos are never zoomed or cropped.

# Design & Interaction
- Dynamic UI Rendering: Automatically generates text, interactive "pill" buttons, and video cards based on the current state.

- Luxury Persona: Features "Arjun," a personified Lead Host, to create a more engaging and high-end conversational experience.

- Responsive Layout: Fully styled with CSS for smooth transitions and a mobile-friendly chat interface.
