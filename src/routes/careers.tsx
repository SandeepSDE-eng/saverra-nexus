import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Building2, Mail, MapPin, Phone, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { submitCareerApplicationFn } from "@/api/misc";
import { toast } from "sonner";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

export const Route = createFileRoute("/careers")({
  head: () => ({
    meta: [
      { title: "Careers & Opportunities | Saverra Realty" },
      { name: "description", content: "Build your career with Saverra Realty. Explore job opportunities in real estate consulting, client relations, and property management in Mumbai." },
      { property: "og:title", content: "Careers & Opportunities | Saverra Realty" },
    ],
  }),
  component: Careers,
});

const formSchema = z.object({
  first_name: z.string().min(2, "First name is required"),
  last_name: z.string().min(2, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Valid phone number is required"),
  position: z.string().min(2, "Position is required"),
  experience_years: z.string().min(1, "Experience is required"),
  resume_url: z.string().url("Must be a valid URL (e.g. Google Drive/LinkedIn)"),
  cover_letter: z.string().optional(),
});

function Careers() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      position: "",
      experience_years: "",
      resume_url: "",
      cover_letter: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsSubmitting(true);
      
      const response = await submitCareerApplicationFn({ data: {
        first_name: values.first_name,
        last_name: values.last_name,
        email: values.email,
        phone: values.phone,
        position: values.position,
        experience_years: values.experience_years,
        resume_url: values.resume_url,
        cover_letter: values.cover_letter,
      }});

      if (!response.success) throw new Error(response.error);

      toast.success("Application submitted successfully! We will get back to you soon.");
      form.reset();
    } catch (error: any) {
      console.error("Error submitting application:", error);
      toast.error(error.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#f8f9fa] pb-20">
      
      {/* Top Banner (Consistent with Premium Pages) */}
      <div className="bg-[color:var(--navy-deep)] text-white relative h-[45vh] min-h-[350px] flex items-center justify-center overflow-hidden pb-12">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-20 filter mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--navy-deep)] to-transparent opacity-80"></div>
        <div className="relative z-10 text-center px-4 animate-fade-up">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-gold/40 bg-white/5 px-4 py-1.5 text-[10px] font-semibold tracking-[0.25em] text-gold uppercase backdrop-blur-md">
            <span className="size-1.5 rounded-full bg-gold animate-pulse"></span>
            Join Our Team
          </div>
          <h1 className="font-display text-4xl md:text-6xl font-light tracking-wide mb-4">
            Build Your <span className="text-gold italic font-medium">Career</span>
          </h1>
          <p className="text-white/80 max-w-2xl mx-auto font-light tracking-wide text-sm md:text-lg">
            Be part of a dynamic, forward-thinking team shaping the future of real estate.
          </p>
        </div>
      </div>

      <div className="container-luxe max-w-6xl mx-auto -mt-16 relative z-20">
        <div className="bg-white rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-border/50 p-6 md:p-12 mb-16 animate-fade-up">
          
          <div className="grid md:grid-cols-[1fr_1.5fr] gap-12 lg:gap-20">
            {/* Left Content */}
            <div>
              <h2 className="font-display text-3xl font-light mb-6 text-primary">Why Work With Us?</h2>
              <p className="text-muted-foreground mb-8 text-sm md:text-base leading-relaxed">
                At Saverra Realty, we believe that our greatest asset is our people. We foster an environment of growth, innovation, and excellence. We are always looking for passionate individuals who are ready to make a significant impact in the real estate industry.
              </p>

              <div className="space-y-6 mt-8">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold/10 text-gold">
                    <Briefcase className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">Professional Growth</h3>
                    <p className="text-sm text-muted-foreground mt-1">Continuous learning and career development opportunities.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold/10 text-gold">
                    <Building2 className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">Premium Projects</h3>
                    <p className="text-sm text-muted-foreground mt-1">Work on some of the most prestigious real estate developments.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Application Form */}
            <div className="bg-[#f8f9fa] rounded-2xl p-6 md:p-8 border border-border/50 shadow-inner">
              <h3 className="font-display text-2xl font-light mb-6 text-primary text-center">Application Form</h3>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="first_name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John" className="bg-white" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="last_name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Last Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Doe" className="bg-white" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="john@example.com" className="bg-white" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input placeholder="+91 98765 43210" className="bg-white" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="position"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Position Applied For</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. Sales Manager" className="bg-white" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="experience_years"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Years of Experience</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. 5 Years" className="bg-white" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="resume_url"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Resume Link / LinkedIn Profile</FormLabel>
                        <FormControl>
                          <Input placeholder="https://..." className="bg-white" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="cover_letter"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cover Letter (Optional)</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Tell us why you'd be a great fit..." 
                            className="resize-none bg-white min-h-[100px]" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-[color:var(--navy-deep)] hover:bg-[color:var(--navy-deep)]/90 text-white h-12 mt-4 text-base tracking-wide"
                  >
                    {isSubmitting ? "Submitting Application..." : "Submit Application"}
                  </Button>
                </form>
              </Form>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
