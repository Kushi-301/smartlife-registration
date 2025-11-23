import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useState } from "react";
import "./RegistrationForm.css";

// Validation schema
const registrationSchema = z.object({
  userType: z.enum(["volunteer", "vendor", "corporate"]),
  countryOfResidence: z.string().min(1, "Country of residence is required"),
  emiratesId: z.string().optional(),
  emiratesIdExpiry: z.string().optional(),
  firstNameEnglish: z.string().min(1, "First name is required"),
  lastNameEnglish: z.string().min(1, "Last name is required"),
  firstNameArabic: z.string().optional(),
  lastNameArabic: z.string().optional(),
  email: z.string().email("Invalid email address"),
  mobile: z.string().min(8, "Mobile number is required"),
  gender: z.enum(["male", "female", "other"]),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  country: z.string().min(1, "Country is required"),
  state: z.string().optional(),
  city: z.string().optional(),
  address: z.string().optional(),
  personOfDetermination: z.boolean().optional(),
  howDidYouHear: z.string().optional(),
  vat: z.string().optional(),
});

type RegistrationFormData = z.infer<typeof registrationSchema>;

export function RegistrationForm() {
  const createRegistration = useMutation(api.registrations.createRegistration);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      userType: "volunteer",
      personOfDetermination: false,
    },
  });

  const countryOfResidence = watch("countryOfResidence");

  const onSubmit = async (data: RegistrationFormData) => {
    try {
      setSubmitStatus("submitting");
      setErrorMessage("");

      await createRegistration({
        ...data,
        personOfDetermination: data.personOfDetermination || false,
      });

      setSubmitStatus("success");
      reset();
      
      setTimeout(() => setSubmitStatus("idle"), 3000);
    } catch (error) {
      setSubmitStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Registration failed");
    }
  };

  return (
    <div className="registration-container">
      <div className="registration-card">
        <div className="registration-header">
          <h1>SmartLife Foundation</h1>
          <p>Registration Form</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="registration-form">
          {/* User Type Selection */}
          <div className="form-section">
            <h2>User Type</h2>
            <div className="user-type-buttons">
              <label className="user-type-option">
                <input type="radio" value="volunteer" {...register("userType")} />
                <span>Volunteer</span>
              </label>
              <label className="user-type-option">
                <input type="radio" value="vendor" {...register("userType")} />
                <span>Vendor</span>
              </label>
              <label className="user-type-option">
                <input type="radio" value="corporate" {...register("userType")} />
                <span>Corporate</span>
              </label>
            </div>
            {errors.userType && <p className="error">{errors.userType.message}</p>}
          </div>

          {/* Country of Residence */}
          <div className="form-group">
            <label>Country of Residence *</label>
            <select {...register("countryOfResidence")} className="form-control">
              <option value="">Select Country</option>
              <option value="United Arab Emirates">United Arab Emirates</option>
              <option value="Afghanistan">Afghanistan</option>
              <option value="Albania">Albania</option>
              <option value="Algeria">Algeria</option>
              <option value="United States">United States</option>
              <option value="United Kingdom">United Kingdom</option>
              <option value="India">India</option>
              <option value="Pakistan">Pakistan</option>
              <option value="Saudi Arabia">Saudi Arabia</option>
            </select>
            {errors.countryOfResidence && <p className="error">{errors.countryOfResidence.message}</p>}
          </div>

          {/* Emirates ID fields */}
          {countryOfResidence === "United Arab Emirates" && (
            <>
              <div className="form-group">
                <label>Emirates ID Number</label>
                <input
                  type="text"
                  placeholder="784-XXXX-XXXXXXX-X"
                  {...register("emiratesId")}
                  className="form-control"
                />
              </div>

              <div className="form-group">
                <label>Emirates ID Expiry Date</label>
                <input
                  type="date"
                  {...register("emiratesIdExpiry")}
                  className="form-control"
                />
              </div>
            </>
          )}

          {/* Name Fields */}
          <div className="form-section">
            <h2>Personal Information</h2>
            
            <div className="form-row">
              <div className="form-group">
                <label>First Name (English) *</label>
                <input
                  type="text"
                  {...register("firstNameEnglish")}
                  className="form-control"
                  placeholder="John"
                />
                {errors.firstNameEnglish && <p className="error">{errors.firstNameEnglish.message}</p>}
              </div>

              <div className="form-group">
                <label>Last Name (English) *</label>
                <input
                  type="text"
                  {...register("lastNameEnglish")}
                  className="form-control"
                  placeholder="Doe"
                />
                {errors.lastNameEnglish && <p className="error">{errors.lastNameEnglish.message}</p>}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>First Name (Arabic)</label>
                <input
                  type="text"
                  {...register("firstNameArabic")}
                  className="form-control"
                  placeholder="اسم"
                  dir="rtl"
                />
              </div>

              <div className="form-group">
                <label>Last Name (Arabic)</label>
                <input
                  type="text"
                  {...register("lastNameArabic")}
                  className="form-control"
                  placeholder="العائلة"
                  dir="rtl"
                />
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="form-section">
            <h2>Contact Information</h2>
            
            <div className="form-group">
              <label>Email *</label>
              <input
                type="email"
                {...register("email")}
                className="form-control"
                placeholder="your.email@example.com"
              />
              {errors.email && <p className="error">{errors.email.message}</p>}
            </div>

            <div className="form-group">
              <label>Mobile *</label>
              <input
                type="tel"
                {...register("mobile")}
                className="form-control"
                placeholder="+971 XX XXX XXXX"
              />
              {errors.mobile && <p className="error">{errors.mobile.message}</p>}
            </div>
          </div>

          {/* Personal Details */}
          <div className="form-section">
            <h2>Additional Details</h2>
            
            <div className="form-row">
              <div className="form-group">
                <label>Gender *</label>
                <select {...register("gender")} className="form-control">
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                {errors.gender && <p className="error">{errors.gender.message}</p>}
              </div>

              <div className="form-group">
                <label>Date of Birth *</label>
                <input
                  type="date"
                  {...register("dateOfBirth")}
                  className="form-control"
                />
                {errors.dateOfBirth && <p className="error">{errors.dateOfBirth.message}</p>}
              </div>
            </div>

            <div className="form-group">
              <label>Country *</label>
              <select {...register("country")} className="form-control">
                <option value="">Select Country</option>
                <option value="United Arab Emirates">United Arab Emirates</option>
                <option value="United States">United States</option>
                <option value="United Kingdom">United Kingdom</option>
                <option value="India">India</option>
              </select>
              {errors.country && <p className="error">{errors.country.message}</p>}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>State</label>
                <input
                  type="text"
                  {...register("state")}
                  className="form-control"
                  placeholder="State"
                />
              </div>

              <div className="form-group">
                <label>City</label>
                <input
                  type="text"
                  {...register("city")}
                  className="form-control"
                  placeholder="City"
                />
              </div>
            </div>

            <div className="form-group">
              <label>Address</label>
              <textarea
                {...register("address")}
                className="form-control"
                placeholder="Your address"
                rows={3}
              />
            </div>
          </div>

          {/* Additional Information */}
          <div className="form-section">
            <div className="form-group checkbox-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  {...register("personOfDetermination")}
                />
                <span>Person of Determination</span>
              </label>
            </div>

            <div className="form-group">
              <label>How did you hear about us?</label>
              <select {...register("howDidYouHear")} className="form-control">
                <option value="">Select an option</option>
                <option value="social-media">Social Media</option>
                <option value="website">Website</option>
                <option value="friend">Friend</option>
                <option value="whatsapp">WhatsApp</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label>VAT Number</label>
              <input
                type="text"
                {...register("vat")}
                className="form-control"
                placeholder="VAT Number (if applicable)"
              />
            </div>
          </div>

          {/* Status Messages */}
          {submitStatus === "success" && (
            <div className="status-message success">
              Registration submitted successfully!
            </div>
          )}

          {submitStatus === "error" && (
            <div className="status-message error">
              Error: {errorMessage}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="btn-submit"
            disabled={submitStatus === "submitting"}
          >
            {submitStatus === "submitting" ? "Submitting..." : "Sign Up"}
          </button>

          <p className="login-link">
            Already have an account? <a href="/login">Login</a>
          </p>
        </form>
      </div>
    </div>
  );
}
