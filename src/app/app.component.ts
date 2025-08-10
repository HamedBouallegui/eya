import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

// Declare emailjs as optional to handle loading
declare var emailjs: any;

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'eya';
  showLoading = true;
  
  // Form data
  contactForm = {
    name: '',
    email: '',
    message: ''
  };
  
  isSubmitting = false;

  ngOnInit() {
    // Hide loading screen after 2 seconds
    setTimeout(() => {
      this.showLoading = false;
    }, 2000);
    
    // Initialize EmailJS after a delay to ensure script is loaded
    setTimeout(() => {
      this.initEmailJS();
    }, 1000);
  }
  
  initEmailJS() {
    // Check if EmailJS is loaded, if not wait and try again
    if (typeof emailjs !== 'undefined') {
      emailjs.init('AiGUj6pwUEDVlS_b-');
      console.log('EmailJS initialized successfully');
    } else {
      console.log('EmailJS not loaded yet, retrying...');
      setTimeout(() => this.initEmailJS(), 1000);
    }
  }
  
  async onSubmit() {
    if (this.isSubmitting) return;
    
    this.isSubmitting = true;
    
    try {
      // Check if EmailJS is available
      if (typeof emailjs === 'undefined') {
        throw new Error('EmailJS is not loaded yet. Please try again in a moment.');
      }
      
      // Prepare email template parameters
      const templateParams = {
        to_email: 'hamedblg29@gmail.com',
        from_name: this.contactForm.name,
        from_email: this.contactForm.email,
        message: this.contactForm.message,
        reply_to: this.contactForm.email
      };
      
      // Send email using EmailJS
      const response = await emailjs.send(
        'service_v7d5vio',    // Gmail service ID
        'template_jozce0f',   // Email template ID
        templateParams
      );
      
      console.log('Email sent successfully:', response);
      
      // Show success message
      const alertMessages = [
        `Thank you ${this.contactForm.name}! Your love note has reached my heart. I will treasure it forever. 💖💕`,
        `My dearest ${this.contactForm.name}, your beautiful words have made my heart flutter with joy! 💓✨`,
        `${this.contactForm.name}, your message is like a warm embrace to my soul. Thank you for being amazing! 💞🌹`,
        `Sweet ${this.contactForm.name}, every word you write fills my heart with endless happiness! 💝💫`
      ];
      
      const randomMessage = alertMessages[Math.floor(Math.random() * alertMessages.length)];
      alert(randomMessage);
      
      // Reset form
      this.contactForm = {
        name: '',
        email: '',
        message: ''
      };
      
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Sorry, there was an error sending your message. Please try again later. 💔');
    } finally {
      this.isSubmitting = false;
    }
  }
}
