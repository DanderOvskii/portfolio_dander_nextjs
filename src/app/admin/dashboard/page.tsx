"use client";
import Image from "next/image";
import { ChangeEvent, FormEvent, useState } from "react";
import { ProjectFormData } from "@/utils/types";
import { initialProjectData, genericErrors } from "@/utils/constants";
import { uploadImage, addProject } from "@/utils/api";

export default function Dashboard() {
    const [formData, setFormData] = useState<ProjectFormData>(initialProjectData);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState<File | null>(null);
  
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
      const f = e.target.files?.[0] || null;
      if (f) {
        // Check file type
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
        if (!allowedTypes.includes(f.type)) {
          setError('Please select a valid image file (JPG, PNG, GIF, or WebP)');
          e.target.value = '';
          return;
        }
        
        // Check file size (5MB limit)
        const maxSize = 5 * 1024 * 1024; // 5MB in bytes
        if (f.size > maxSize) {
          setError('File size must be less than 5MB');
          e.target.value = ''; // Clear the input
          return;
        }
        
        // Clear any previous errors
        setError(null);
      }
      setFile(f);
    };
  

    const handleSubmit = async (e: FormEvent) => {
      e.preventDefault();
      setLoading(true);
      setError(null);
    
      try {
        // 1) Upload image first (optional)
        let imagePath: string | null = null;
        if (file) {
          const { path } = await uploadImage(file);
          imagePath = path; // e.g. "/uploads/123-abc.png"
        }
    
        // 2) Create project with the returned path
        await addProject({
          name: formData.name,
          description: formData.description,
          projectDate: formData.projectDate, // "yyyy-mm-dd"
          languages: formData.languages,
          website: formData.website || null,
          image: imagePath,
        });
    
        setFormData(initialProjectData);
        setFile(null);
      } catch (error) {
        setError((error as Error).message || genericErrors.signupFailed);
      } finally {
        setLoading(false);
      }
    };
  
    return (
    <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen gap-10 p-6">
      <div className="relative w-full lg:w-1/2 h-64 lg:h-[420px]">
        <Image
          src="/undraw_dashboard.svg"
          alt="Admin Dashboard"
          fill
          style={{ objectFit: "contain" }}
        />
      </div>

      <form onSubmit={handleSubmit} className="w-full lg:w-1/2 max-w-xl space-y-4">
        <h2 className="text-2xl font-bold text-c-secondary">Add Project</h2>

        <div>
          <label htmlFor="name" className="block text-sm font-medium text-c-secondary">Name</label>
          <input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring-c-primary focus:border-c-primary"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-c-secondary">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={4}
            className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring-c-primary focus:border-c-primary"
          />
        </div>

        <div>
          <label htmlFor="projectDate" className="block text-sm font-medium text-c-secondary">Project Date</label>
          <input
            type="date"
            id="projectDate"
            name="projectDate"
            value={formData.projectDate}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring-c-primary focus:border-c-primary"
          />
        </div>

        <div>
          <label htmlFor="languages" className="block text-sm font-medium text-c-secondary">Languages/Stack</label>
          <input
            id="languages"
            name="languages"
            value={formData.languages}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring-c-primary focus:border-c-primary"
          />
        </div>


        <div>
          <label htmlFor="website" className="block text-sm font-medium text-c-secondary">Website URL</label>
          <input
            type="url"
            id="website"
            name="website"
            value={formData.website || ""}
            onChange={handleChange}
            placeholder="https://..."
            className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring-c-primary focus:border-c-primary"
          />
        </div>
        <div>
          <label htmlFor="image" className="block text-sm font-medium text-c-secondary">Image URL</label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring-c-primary focus:border-c-primary"
          />
        </div>

        {error && <p className="text-red-800">{error}</p>}

        <button
          type="submit"
          className="flex items-center justify-center space-x-2 w-full px-4 py-2 font-medium text-white bg-c-secondary rounded-md hover:bg-c-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-c-primary disabled:cursor-wait disabled:opacity-80"
          disabled={loading}
        >
          {loading ? "Saving..." : "Add Project"}
        </button>
      </form>
    </div>
  );
}