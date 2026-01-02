'use client';

export default function Footer({ profile }: { profile: any }) {
    return (
        <footer className="bg-[#F4F4F4] pt-12 pb-8 border-t border-gray-200 mt-12">
            <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">

                {/* Left: Contact Info */}
                <div className="flex flex-col md:flex-row gap-4 md:gap-8 mb-4 md:mb-0 text-center md:text-left">
                    {profile?.email && (
                        <span>{profile.email}</span>
                    )}
                    {profile?.location && (
                        <span>{profile.location}</span>
                    )}
                </div>

                {/* Right: Copyright */}
                <div>
                    &copy; {new Date().getFullYear()} {profile?.name || 'Hilal Mohammed'}
                </div>
            </div>
        </footer>
    );
}
